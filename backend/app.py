# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import torch
# from PIL import Image
# import torchvision.transforms as transforms
# from model import CNNModel

# app = Flask(__name__)
# CORS(app)

# # Device

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # Load model
# model = CNNModel()
# model.load_state_dict(torch.load("deepfake_model.pth", map_location=device))
# model.to(device)
# model.eval()

# transform = transforms.Compose([
#     transforms.Resize((128,128)),
#     transforms.ToTensor()
# ])

# @app.route("/predict", methods=["POST"])
# def predict():
#     file = request.files['image']
#     img = Image.open(file).convert("RGB")
#     img = transform(img).unsqueeze(0).to(device)

#     output = model(img)
#     prob = output.item()

#     pred = "Real" if prob > 0.5 else "False"

#     return jsonify({
#         "prediction": pred,
#         "confidence": float(prob)
#     })


# if __name__ == "__main__":


#     app.run(debug=True)
    
#ABOVE ONE WAS WORKING
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from PIL import Image
# import torchvision.transforms as transforms heyy
# from model import CNNModel//hey
from model import get_model
from custom_dataset import get_transform
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import os
import uuid
from flask import send_from_directory

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app = Flask(__name__)
CORS(app)

# -------------------------------
# Database Setup (SQLite)
# -------------------------------

def init_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT,
        password TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

# -------------------------------
# Load Model
# -------------------------------

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu") hey
device = torch.device("cpu")

# model = CNNModel()
# model.load_state_dict(torch.load("deepfake_model.pth", map_location=device))
# model.to(device)
# model.eval() heyy
model = get_model(device)

# load pretrained weights from repo
checkpoint = torch.load("models/model_epoch_24.pth", map_location=device)
model.load_state_dict(checkpoint['model_state_dict'])

model.eval()

# transform = transforms.Compose([
#     transforms.Resize((128,128)),
#     transforms.ToTensor()
# ])heyy
transform = get_transform()

# -------------------------------
# Register API
# -------------------------------

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    username = data["username"]
    email = data["email"]
    password = generate_password_hash(data["password"])

    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO users(username,email,password) VALUES(?,?,?)",
            (username,email,password)
        )

        conn.commit()
        conn.close()

        return jsonify({"success":True})

    except:
        return jsonify({"success":False,"message":"User already exists"})


# -------------------------------
# Login API
# -------------------------------

# @app.route("/login", methods=["POST"])
# def login():

#     data = request.json

#     username = data["username"]
#     password = data["password"]

#     conn = sqlite3.connect("users.db")
#     cursor = conn.cursor()

#     # cursor.execute(
#     #     "SELECT * FROM users WHERE username=?",
#     #     (username,)
#     # )
#     # NEW: Make it case-insensitive
#     cursor.execute(
#           "SELECT * FROM users WHERE LOWER(username)=?",
#            (username.lower(),)
#     )

#     user = cursor.fetchone()
#     conn.close()
#     print("DEBUG: user from DB:", user)
#     if user and check_password_hash(user[3],password):
#         return jsonify({"success":True})

#     return jsonify({"success":False})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username", "").strip().lower()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"success": False, "message": "Missing fields"})

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE LOWER(username)=?",
        (username,)
    )

    user = cursor.fetchone()
    conn.close()

    if user:
        stored_password_hash = user[3]
        print("DEBUG: Found user:", user[1])                    # should show the stored username
        print("DEBUG: Hash length:", len(stored_password_hash)) # should be long string

        if check_password_hash(stored_password_hash, password):
            return jsonify({"success": True})
        else:
            print("DEBUG: Password check failed")
            return jsonify({"success": False, "message": "Wrong password"})
    else:
        print("DEBUG: User not found")
        return jsonify({"success": False, "message": "User not found"})

    return jsonify({"success": False})
# -------------------------------
# Predict API
# -------------------------------

# @app.route("/predict", methods=["POST"])
# def predict():

#     file = request.files['image']

#     img = Image.open(file).convert("RGB")
#     img = transform(img).unsqueeze(0).to(device)

#     with torch.no_grad():
#         output = model(img)
#         prob = output.item()

#     pred = "Real" if prob > 0.5 else "Fake"

#     return jsonify({
#         "prediction": pred,
#         "confidence": float(prob)
#     })

# //history new feature 
@app.route("/predict", methods=["POST"])
@app.route("/predict", methods=["POST"])
def predict():
    file = request.files['image']
    username = request.form.get("username")

    # Save image
    filename = str(uuid.uuid4()) + ".jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Process image
    img = Image.open(filepath).convert("RGB")
    img = transform(img).unsqueeze(0).to(device)

    # 🔥 Prediction (FIXED)
    with torch.no_grad():
        outputs = model(img)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        predicted = torch.argmax(probs, dim=1).item()

    label_map = {0: "Real", 1: "Fake"}
    pred = label_map[predicted]
    confidence = probs[0][predicted].item()

    # Save to DB
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS results(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        image_path TEXT,
        prediction TEXT,
        confidence REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute(
        "INSERT INTO results(username, image_path, prediction, confidence) VALUES (?, ?, ?, ?)",
        (username, filepath, pred, float(confidence))   # ✅ FIXED HERE
    )

    conn.commit()
    conn.close()

    return jsonify({
        "prediction": pred,
        "confidence": float(confidence),
        "image": filepath
    })
# def predict():hey
#     file = request.files['image']
#     username = request.form.get("username")

#     # 🔥 Save image
#     filename = str(uuid.uuid4()) + ".jpg"
#     filepath = os.path.join(UPLOAD_FOLDER, filename)
#     file.save(filepath)

#     # Process image
#     img = Image.open(filepath).convert("RGB")
#     img = transform(img).unsqueeze(0).to(device)

#     # with torch.no_grad():
#     #     output = model(img)
#     #     prob = output.item()

#     # pred = "Real" if prob > 0.5 else "Fake"
#     with torch.no_grad():
#     outputs = model(img)
#     probs = torch.nn.functional.softmax(outputs.logits, dim=1)
#     predicted = torch.argmax(probs, dim=1).item()

#     label_map = {0: "Real", 1: "Fake"}
#     pred = label_map[predicted]

#     confidence = probs[0][predicted].item()

#     # Save to DB
#     conn = sqlite3.connect("users.db")
#     cursor = conn.cursor()

#     cursor.execute("""
#     CREATE TABLE IF NOT EXISTS results(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         username TEXT,
#         image_path TEXT,
#         prediction TEXT,
#         confidence REAL,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#     )
#     """)

#     cursor.execute(
#         "INSERT INTO results(username, image_path, prediction, confidence) VALUES (?, ?, ?, ?)",
#         (username, filepath, pred, float(prob))
#     )

#     conn.commit()
#     conn.close()

#     return jsonify({
#         "prediction": pred,
#         "confidence": float(confidence),
#         "image": filepath
#     })
# new below and top
@app.route("/uploads/<filename>")
def get_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
# new hist api
@app.route("/history/<username>", methods=["GET"])
def get_history(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT image_path, prediction, confidence, created_at FROM results WHERE username=? ORDER BY id DESC",
        (username,)
    )

    rows = cursor.fetchall()
    conn.close()

    results = [
        {
            "image": r[0],
            "prediction": r[1],
            "confidence": r[2],
            "time": r[3]
        }
        for r in rows
    ]

    return jsonify(results)
# -------------------------------
# Run Server
# -------------------------------

if __name__ == "__main__":
    app.run(debug=True)
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import tensorflow as tf
# import numpy as np
# from PIL import Image

# app = Flask(__name__)
# CORS(app)

# model = tf.keras.models.load_model("deepfake_model.h5")

# @app.route('/predict', methods=['POST'])
# def predict():

#     file = request.files['file']

#     image = Image.open(file).resize((224,224))
#     image = np.array(image)/255.0
#     image = np.expand_dims(image, axis=0)

#     prediction = model.predict(image)[0][0]

#     if prediction > 0.5:
#         result = "Fake"
#         confidence = float(prediction*100)
#     else:
#         result = "Real"
#         confidence = float((1-prediction)*100)

#     return jsonify({
#         "result": result,
#         "confidence": round(confidence,2)
#     })


# if __name__ == '__main__':
#     app.run(debug=True)