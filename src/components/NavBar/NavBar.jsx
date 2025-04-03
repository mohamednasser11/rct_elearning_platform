import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.style.css";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/cartContext";
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import bookLogo from "D:/CS Project/FRONTEND DESIGN/book.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="left-section">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={bookLogo} alt="Book Logo" className="nav-book-logo" />
          <div className="logo-container">
            <span className="logo-first">Beyond</span>
            <span className="logo-second">the Blackboard</span>
          </div>
        </Link>
      </div>
      
      <div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes className="close-icon" /> : <FaBars className="menu-icon" />}
      </div>
      
      <div className={`nav-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}></div>
      
      <div className={`nav-content ${isOpen ? 'open' : ''}`}>
        <div className="main-nav-group">
          <Link to="/" className="nav-link main-nav-item" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/courses" className="nav-link main-nav-item" onClick={closeMenu}>
            Courses
          </Link>
          <Link to="/for-students" className="nav-link main-nav-item" onClick={closeMenu}>
            For Students
          </Link>
          <Link to="/for-educators" className="nav-link main-nav-item" onClick={closeMenu}>
            For Educators
          </Link>
          <Link to="/ai-tools" className="nav-link main-nav-item" onClick={closeMenu}>
            AI Tools
          </Link>
        </div>
        
        <div className="right-section">
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link auth-nav-item" onClick={closeMenu}>
                Log In
              </Link>
              <Link to="/signup" className="nav-link auth-nav-item signup-btn" onClick={closeMenu}>
                Sign Up
              </Link>
              <Link to="/cart" className="nav-link cart-btn auth-nav-item" onClick={closeMenu}>
                <FaShoppingCart />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <div onClick={() => { logout(); closeMenu(); }} className="nav-link auth-nav-item">
                Logout
              </div>
              <Link to="/cart" className="nav-link cart-btn auth-nav-item" onClick={closeMenu}>
                <FaShoppingCart />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
