// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// function Login(){

// const [username,setUsername]=useState("")
// const [password,setPassword]=useState("")

// const navigate = useNavigate()

// const login = async () => {

// const res = await axios.post("http://localhost:5000/login",{
// username,
// password
// })

// if(res.data.success){

// localStorage.setItem("user",username)
// navigate("/detect")

// }else{

// alert("Invalid credentials")

// }

// }

// return (

// <div className="login">

// <h2>Login</h2>

// <input
// placeholder="Username"
// onChange={(e)=>setUsername(e.target.value)}
// />

// <input
// type="password"
// placeholder="Password"
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button onClick={login}>
// Login
// </button>

// </div>

// )

// }

// // export default Login
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/login", { username, password });
//       if (res.data.success) {
//         localStorage.setItem("user", username);
//         navigate("/detect");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (err) {
//       alert("Server error. Try again.");
//     }
//   };

//   return (
//     <div className="login">
//       <h2>Login</h2>
//       <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const login = async () => {
  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  const loginUsername = username.trim().toLowerCase();   // ← make it clear

  try {
    const res = await axios.post("http://localhost:5000/login", {
      username: loginUsername,   // always lowercase
      password,
    });

    if (res.data.success) {
      localStorage.setItem("user", loginUsername);   // save lowercase
      navigate("/detect");
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Make sure backend is running.");
  }
};
//   const login = async () => {
//     if (!username || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         username: username.trim().toLowerCase(),
//         password,
//       });

//       if (res.data.success) {
//         localStorage.setItem("user", username.trim().toLowerCase());
//         navigate("/detect");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Make sure backend is running.");
//     }
//   };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;