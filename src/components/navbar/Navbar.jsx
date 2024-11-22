import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({handleLogout}) {
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <nav className="navbar">
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
