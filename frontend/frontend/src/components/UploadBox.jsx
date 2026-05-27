// import { useState } from "react"
// import axios from "axios"
// import ResultCard from "./ResultCard"
// import Loader from "./Loader"

// function UploadBox(){

// const [image,setImage]=useState(null)
// const [result,setResult]=useState(null)
// const [loading,setLoading]=useState(false)

// const upload = async () => {

// const formData = new FormData()
// formData.append("image",image)

// setLoading(true)

// const res = await axios.post(
// "http://localhost:5000/predict",
// formData
// )

// setResult(res.data)
// setLoading(false)

// }

// return(

// <div className="upload">

// <input type="file"
// onChange={(e)=>setImage(e.target.files[0])}
// />

// <button onClick={upload}>
// Analyze
// </button>

// {loading && <Loader/>}

// {result && <ResultCard data={result}/>}

// </div>

// )

// }

// export default UploadBox
// import { useState } from "react";
// import axios from "axios";
// import ResultCard from "./ResultCard";
// import Loader from "./Loader";

// function UploadBox() {

//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const upload = async () => {

//     if (!image) {
//       alert("Please select an image first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       setLoading(true);
//       setResult(null);

//       const res = await axios.post(
//         "http://localhost:5000/predict",
//         formData
//       );

//       console.log(res.data); // 🔥 CHECK THIS

//       setResult(res.data);

//     } catch (error) {
//       console.error("Error:", error);

//       alert("Server error or API not responding");

//     } finally {
//       setLoading(false); // 🔥 ALWAYS runs
//     }
//   };

//   return (

//     <div className="upload">

//       <input 
//         type="file"
//         onChange={(e) => setImage(e.target.files[0])}
//       />

//       <button onClick={upload}>
//         Analyze
//       </button>

//       {loading && <Loader />}

//       {result && <ResultCard data={result} />}

//     </div>

//   );
// }

// export default UploadBox;
//adding preview
// import { useState, useEffect } from "react";
// import axios from "axios";
// import ResultCard from "./ResultCard";
// import Loader from "./Loader";

// function UploadBox() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);

//     // Create preview URL
//     const previewURL = URL.createObjectURL(file);
//     setPreview(previewURL);
//   };

//   const upload = async () => {
//     if (!image) {
//       alert("Please select an image first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       setLoading(true);
//       setResult(null);

//       const res = await axios.post(
//         "http://localhost:5000/predict",
//         formData
//       );

//       console.log(res.data);

//       setResult(res.data);

//     } catch (error) {
//       console.error("Error:", error);
//       alert("Server error or API not responding");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cleanup preview URL (prevents memory leak)
//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   return (
//     <div className="upload">

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//       />

//       {/* ✅ Image Preview */}
//       {preview && (
//         <div className="preview-container">
//           <img src={preview} alt="preview" className="preview-image" />
//         </div>
//       )}

//       <button onClick={upload}>
//         Analyze
//       </button>

//       {loading && <Loader />}

//       {result && <ResultCard data={result} />}

//     </div>
//   );
// }

// export default UploadBox;
import { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import Loader from "./Loader";

function UploadBox() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    // Create preview URL
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const upload = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    // 🔥 ADD USERNAME
    const user = localStorage.getItem("user");
    formData.append("username", user);

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post(
        "http://localhost:5000/predict",
        formData
      );

      console.log(res.data);

      setResult(res.data);

    } catch (error) {
      console.error("Error:", error);
      alert("Server error or API not responding");
    } finally {
      setLoading(false);
    }
  };

  // Cleanup preview URL (prevents memory leak)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="upload">

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* ✅ Image Preview */}
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="preview" className="preview-image" />
        </div>
      )}

      <button onClick={upload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && <Loader />}

      {result && <ResultCard data={result} />}

    </div>
  );
}

export default UploadBox;