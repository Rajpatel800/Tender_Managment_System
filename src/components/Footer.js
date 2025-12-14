import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <div className="footer-logo-icon">🏛️</div>
            <div className="footer-logo-text">Government of Rajasthan</div>
          </div>
        </div>
        <div className="footer-center">
          <nav className="footer-nav">
            <Link to="#" className="footer-link">Privacy Policy</Link>
            <Link to="#" className="footer-link">Terms of Use</Link>
            <Link to="#" className="footer-link">Help Desk</Link>
            <Link to="#" className="footer-link">Contact Us</Link>
          </nav>
        </div>
        <div className="footer-right">
          <div className="footer-copyright">
            © 2024 Government of Rajasthan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

