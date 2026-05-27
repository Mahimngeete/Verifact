// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// function Register(){

// const [username,setUsername]=useState("")
// const [email,setEmail]=useState("")
// const [password,setPassword]=useState("")

// const navigate = useNavigate()

// const register = async () => {

// await axios.post("http://localhost:5000/register",{
// username,
// email,
// password
// })

// alert("Registered Successfully")
// navigate("/login")

// }

// return (

// <div className="login">

// <h2>Register</h2>

// <input
// placeholder="Username"
// onChange={(e)=>setUsername(e.target.value)}
// />

// <input
// placeholder="Email"
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// type="password"
// placeholder="Password"
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button onClick={register}>
// Register
// </button>

// </div>

// )

// }

// export default Register
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const register = async () => {
//     if (!username || !email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       // Register user
//       const res = await axios.post("http://localhost:5000/register", {
//         username,
//         email,
//         password,
//       });

//       if (res.data.success) {
//         // Auto-login after registration
//         localStorage.setItem("user", username);
//         alert("Registered & Logged in successfully");
//         navigate("/detect");
//       } else {
//         alert(res.data.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Make sure backend is running.");
//     }
//   };

//   return (
//     <div className="login">
//       <h2>Register</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={register}>Register</button>
//     </div>
//   );
// }

// export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", {
        username: username.trim().toLowerCase(),
        email: email.trim(),
        password,
      });

      if (res.data.success) {
        // Auto-login after registration
        localStorage.setItem("user", username.trim().toLowerCase());
        alert("Registered & logged in successfully");
        navigate("/detect");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Make sure backend is running.");
    }
  };

  return (
    <div className="login">
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;