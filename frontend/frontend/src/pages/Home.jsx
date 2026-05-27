// function Home() {

// return (

// <div className="home">

// <section className="hero">

// <div>

// <h1>Detect Deepfakes with <span>Verifact</span></h1>

// <p>
// Verifact is an AI-powered deepfake detection system that analyzes 
// facial patterns and pixel inconsistencies.
// </p>

// </div>

// </section>


// <section>

// <h2>What is Verifact?</h2>

// <div className="cards">

// <div className="card">
// <h3>AI Based</h3>
// <p>Deep learning CNN model</p>
// </div>

// <div className="card">
// <h3>Fast</h3>
// <p>Instant detection</p>
// </div>

// <div className="card">
// <h3>Accurate</h3>
// <p>Confidence based result</p>
// </div>

// </div>

// </section>


// <section>

// <h2>How it Works</h2>

// <div className="cards">

// <div className="card">Upload Image</div>
// <div className="card">AI Processing</div>
// <div className="card">Result</div>

// </div>

// </section>

// </div>

// )

// }

// export default Home
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const handleAnalyzeClick = () => {
        if (user) {
            navigate("/detect");   // ✅ logged in
        } else {
            navigate("/login");    // ❌ not logged in
        }
    };
    return (

        <div className="home">

            {/* ================= HERO ================= */}
            <section className="hero">

                <div className="hero-text">
                    <h1>Detect Deepfakes with <span>Verifact</span></h1>

                    <p>
                        Verifact is an AI-powered deepfake detection system that uses
                        Convolutional Neural Networks (CNNs) to analyze facial patterns,
                        pixel inconsistencies, and image artifacts to determine whether
                        an image is real or fake.
                    </p>

                    <button className="primary-btn" onClick={handleAnalyzeClick}>Analyze Image</button>
                </div>

                <img
                    src="/ai-image.png"
                    alt="AI detection"
                    className="hero-img"
                />

            </section>


            {/* ================= WHAT IS VERIFACT ================= */}
            <section>

                <h2>What is Verifact?</h2>

                <p className="section-desc">
                    Verifact leverages advanced deep learning techniques to detect manipulated
                    images. It ensures reliability, speed, and accuracy for identifying deepfakes.
                </p>

                <div className="cards">

                    <div className="card">
                        <h3>AI-Based System</h3>
                        <p>
                            Uses Convolutional Neural Networks (CNNs) trained on real and fake
                            face datasets to identify subtle manipulation patterns.
                        </p>
                    </div>

                    <div className="card">
                        <h3>Binary Classification</h3>
                        <p>
                            Classifies images as Real or Fake and provides a confidence score
                            to support decision-making.
                        </p>
                    </div>

                    <div className="card">
                        <h3>Fast Detection</h3>
                        <p>
                            Processes uploaded images instantly and delivers results within seconds.
                        </p>
                    </div>

                    {/* EXTRA CARDS (important) */}
                    <div className="card">
                        <h3>High Accuracy</h3>
                        <p>
                            Optimized deep learning model ensures reliable predictions with minimal error.
                        </p>
                    </div>

                    <div className="card">
                        <h3>Confidence Score</h3>
                        <p>
                            Provides a confidence percentage indicating how likely the image is real or fake.
                        </p>
                    </div>

                    <div className="card">
                        <h3>User Friendly</h3>
                        <p>
                            Simple interface that allows anyone to upload and analyze images easily.
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section>

                <h2>How it Works</h2>

                <p className="section-desc">
                    Verifact follows a streamlined process to analyze and detect deepfake images.
                </p>

                <div className="cards">

                    <div className="card">
                        <h3>1. Upload Image</h3>
                        <p>User uploads a face image for analysis.</p>
                    </div>

                    <div className="card">
                        <h3>2. AI Processing</h3>
                        <p>
                            Model extracts facial features and detects manipulation artifacts
                            using CNN.
                        </p>
                    </div>

                    <div className="card">
                        <h3>3. Prediction</h3>
                        <p>
                            System outputs Real or Fake with a confidence percentage score.
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= HOW TO USE ================= */}
            <section>

                <h2>How To Use Verifact</h2>

                <p className="section-desc">
                    Follow these simple steps to analyze images using Verifact.
                </p>

                <div className="cards">

                    <div className="card">
                        <h3>Step 1</h3>
                        <p>Login into your account to access the detection system.</p>
                    </div>

                    <div className="card">
                        <h3>Step 2</h3>
                        <p>Upload an image after logging into the system.</p>
                    </div>

                    <div className="card">
                        <h3>Step 3</h3>
                        <p>Click Analyze and view the prediction results instantly.</p>
                    </div>

                </div>

            </section>


            {/* ================= EXTRA SECTION (fills empty space) ================= */}
            <section className="info-section">

                <div>
                    <h2>Why Choose Verifact?</h2>
                    <p>
                        With the rise of deepfake technology, verifying digital content has become
                        crucial. Verifact provides a fast, reliable, and intelligent solution to
                        detect manipulated images and ensure authenticity.
                    </p>
                </div>

                <div>
                    <h2>Real-Time Results</h2>
                    <p>
                        Get instant feedback with confidence scores, helping you make quick and
                        informed decisions.
                    </p>
                </div>

            </section>

        </div>

    );
}

export default Home;