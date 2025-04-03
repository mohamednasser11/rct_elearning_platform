import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.style.css";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/cartContext";
import { FaShoppingCart } from 'react-icons/fa';
import bookLogo from "D:/CS Project/FRONTEND DESIGN/book.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="navbar-container">
      <div className="left-section">
        <Link to="/" className="navbar-logo">
          <img src={bookLogo} alt="Book Logo" className="nav-book-logo" />
          <div className="logo-container">
            <span className="logo-first">Beyond</span>
            <span className="logo-second">the Blackboard</span>
          </div>
        </Link>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <div className="main-nav-group">
            <Link to="/" className="nav-link main-nav-item">
              Home
            </Link>
            <Link to="/courses" className="nav-link main-nav-item">
              Courses
            </Link>
            <Link to="/for-students" className="nav-link main-nav-item">
              For Students
            </Link>
            <Link to="/for-educators" className="nav-link main-nav-item">
              For Educators
            </Link>
            <Link to="/ai-tools" className="nav-link main-nav-item">
              AI Tools
            </Link>
          </div>
        </div>
      </div>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <div
        className={`close-menu-icon ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        X
      </div>
      <div className="right-section">
        {!isAuthenticated ? (
          <div className="auth-buttons">
            <Link to="/login" className="nav-link auth-nav-item">
              Log In
            </Link>
            <Link to="/signup" className="nav-link auth-nav-item">
              Sign Up
            </Link>
            <Link to="/cart" className="nav-link cart-btn auth-nav-item">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <div onClick={logout} className="nav-link auth-nav-item">
              Logout
            </div>
            <Link to="/cart" className="nav-link cart-btn auth-nav-item">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
