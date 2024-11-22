import { Link } from "react-router-dom";
import { useContext } from "react";
import './Sidebar.css'

function Sidebar() {
    return (
      <div className="sidebar">
        <h1>Sidebar</h1>
        <div className="top-buttons">
          <button>My Care Requests</button>
          <button>My pets</button>
          <button>Profile</button>
        </div>
        <div className="bottom-button">
          <button>Logout</button>
        </div>
      </div>
    );
  }
  
  export default Sidebar;