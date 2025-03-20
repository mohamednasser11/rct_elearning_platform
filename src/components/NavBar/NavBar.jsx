import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.style.css";
import { useAuth } from "../../hooks/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        EduLearn
      </Link>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <div
        className={`close-menu-icon ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        X
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <div className="nav-link-blank"></div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
            <Link to="/quizzes" className="nav-link">
              Quizzes
            </Link>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </>
        )}
        {isAuthenticated && (
          <div onClick={logout} className="nav-link">
            Logout
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
