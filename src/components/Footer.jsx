import React from 'react';
import './Footer.css'; // Add some styles if you wish

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; 2024 Whisker Watchers. All rights reserved.</p>
        </div>
        <div className="footer-center">
          <nav>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;