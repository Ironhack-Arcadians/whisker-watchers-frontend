import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/ww-logo.png"
import "./Navbar.css";

function Navbar({ handleLogout, toggleSignupModal, toggleLoginModel }) {
  const isLoggedIn = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();  // Call your logout function
    navigate("/");    // Redirect to the homepage
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <h3 className="brand-name">Whisker Watchers</h3>
        </div>
        {!isLoggedIn ? (
          <div className="navbar-buttons">
            <button className="navbar-button" onClick={toggleSignupModal}>
              Sign Up
            </button>
            <button className="navbar-button" onClick={toggleLoginModel}>
              Login
            </button>
          </div>
        ) : (
          <div className="navbar-buttons">
            <Link to="/dashboard/owner">
              <button className="navbar-button">Back to Dashboard</button>
            </Link>
            <button className="navbar-button" onClick={handleLogoutAndRedirect}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
