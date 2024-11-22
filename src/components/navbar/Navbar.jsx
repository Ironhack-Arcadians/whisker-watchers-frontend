import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          <button className="navbar-button">Home</button>
        </Link>
        <Link to="/signup" className="navbar-link">
          <button className="navbar-button">Sign Up</button>
        </Link>
        <Link to="/login" className="navbar-link">
          <button className="navbar-button">Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;