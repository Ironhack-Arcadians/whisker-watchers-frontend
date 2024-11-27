import { Link } from "react-router-dom";
import logo from "../../assets/images/ww-logo.png"
import "./Navbar.css";

function Navbar({ handleLogout, toggleSignupModal, toggleLoginModel }) {
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logo" />
          </a>
        </div>
        {!isLoggedIn && (
          <div className="navbar-buttons">
            <button className="navbar-button" onClick={toggleSignupModal}>
              Sign Up
            </button>
            <button className="navbar-button" onClick={toggleLoginModel}>
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
