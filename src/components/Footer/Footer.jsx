import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { PiBookOpenBold } from "react-icons/pi";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about-section">
          <div className="footer-branding">
            <div className="footer-logo"><PiBookOpenBold /></div>
            <h3>Beyond the Blackboard</h3>
          </div>
          <p>Empowering education beyond traditional boundaries. Connect, learn, and grow with our innovative platform</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section categories">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/courses?field=Programming">Programming</Link></li>
            <li><Link to="/courses?field=Design">Design</Link></li>
            <li><Link to="/courses?field=Business">Business</Link></li>
            <li><Link to="/courses?field=Marketing">Marketing</Link></li>
            <li><Link to="/courses?field=Data Science">Data Science</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-us">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <MdLocationOn className="contact-icon" />
              <span>123 Learning Street, Education City, 10001</span>
            </li>
            <li>
              <MdPhone className="contact-icon" />
              <a href="tel:+1234567890">+123 456 7890</a>
            </li>
            <li>
              <MdEmail className="contact-icon" />
              <a href="mailto:info@elearning.com">info@elearning.com</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
