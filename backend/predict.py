# import torch
# from model import CNNModel

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# model = CNNModel()
# model.load_state_dict(torch.load("deepfake_model.pth", map_location=device))

# model.to(device)
# model.eval()

# print("Model Loaded Successfully")

import torch
from model import CNNModel
from PIL import Image
import torchvision.transforms as transforms

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load Model
model = CNNModel()
model.load_state_dict(torch.load("deepfake_model.pth", map_location=device))
model.to(device)
model.eval()

print("Model Loaded Successfully")

# Transform
transform = transforms.Compose([
    transforms.Resize((128,128)),
    transforms.ToTensor()
])

# Prediction Function
def predict(image_path):

    img = Image.open(image_path).convert("RGB")
    img = transform(img).unsqueeze(0).to(device)

    output = model(img)
    
    pred = "Fake" if output.item() > 0.5 else "Real"

    print("Prediction:", pred)

# Test
predict('C:\Users\lenovo\Desktop\vv.jpg')