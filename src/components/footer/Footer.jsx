import React from 'react';
import './Footer.css'; // Add some styles if you wish
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; 2024 Whisker Watchers. All rights reserved.</p>
        </div>
        <div className="footer-center">
          <nav className="footer-nav">
            <ul>
            <Link to="/about"> <button className="abt-btn">About us</button> </Link>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;