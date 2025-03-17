import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.style.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        EduLearn
      </Link>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/courses" className="nav-link">
          Courses
        </Link>
        <Link to="/quizzes" className="nav-link">
          Quizzes
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;