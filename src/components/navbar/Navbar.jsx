import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          <button className="navbar-button">Home</button>
        </Link>
      </div>
      {!isLoggedIn && (
        <div>
          <Link to="/signup" className="navbar-link">
            <button className="navbar-button">Sign Up</button>
          </Link>
          <Link to="/login" className="navbar-link">
            <button className="navbar-button">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
