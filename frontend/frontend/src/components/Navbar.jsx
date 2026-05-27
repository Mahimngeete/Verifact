// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {

// const navigate = useNavigate()

// const logout = () => {
// localStorage.removeItem("user")
// navigate("/login")
// }

// return (
// <nav className="navbar">

// <h2 className="logo">Verifact</h2>

// <div className="nav-links">

// <Link to="/">Home</Link>
// <Link to="/detect">Detect</Link>

// {localStorage.getItem("user") ? (
// <button onClick={logout}>Logout</button>
// ) : (
// <>
// <Link to="/login">Login</Link>
// <Link to="/register">Register</Link>
// </>
// )}

// </div>

// </nav>
// )

// }

// export default Navbar
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">

//       <Link to="/" className="logo">Verifact</Link>

//       <div className="nav-links">

//         <Link to="/">Home</Link>
//         <Link to="/detect">Detect</Link>

//         {localStorage.getItem("user") ? (
//           <button className="logout-btn" onClick={logout}>
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register" className="register-btn">
//               Register
//             </Link>
//           </>
//         )}

//       </div>

//     </nav>
//   );
// }

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Verifact</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user && <Link to="/detect">Detect</Link>}
        {user && <Link to="/history">History</Link>}
        {user ? (
          <>
            <span className="username">Hello, {user}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;