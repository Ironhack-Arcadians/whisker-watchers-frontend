import { Link } from "react-router-dom";
import logo from "../../assets/images/ww-logo.png"
import "./Navbar.css";

function Navbar({ handleLogout }) {
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        {!isLoggedIn && (
          <div className="navbar-buttons">
            <Link to="/signup" className="navbar-link">
              <button className="navbar-button">Sign Up</button>
            </Link>
            <Link to="/login" className="navbar-link">
              <button className="navbar-button">Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
