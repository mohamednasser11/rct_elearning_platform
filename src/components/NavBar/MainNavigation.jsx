import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/cartContext";
import { PiBookOpenBold } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { coursesData } from "../../data/coursesData";
import HamburgerMenu from "./HamburgerMenu";
import { useDepartment } from "../../contexts/departmentContext";

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { departments } = useDepartment();
  const { cartCount } = useCart();

  // Add pulse animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 500); // Duration of the pulse animation
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Extract unique course categories

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (isOpen || isCategoryMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isCategoryMenuOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const closeCategoryMenu = () => {
    setIsCategoryMenuOpen(false);
  };

  return (
    <nav className={`main-navigation-container ${scrolled ? "scrolled" : ""}`}>
      {/* Hamburger Menu Component */}
      <HamburgerMenu
        isCategoryMenuOpen={isCategoryMenuOpen}
        setIsCategoryMenuOpen={setIsCategoryMenuOpen}
        courseCategories={Object.values(departments)}
        categoriesExpanded={categoriesExpanded}
        setCategoriesExpanded={setCategoriesExpanded}
        isAuthenticated={isAuthenticated}
        logout={logout}
        closeCategoryMenu={closeCategoryMenu}
      />

      <div className="main-navigation-left-section">
        <Link to="/" className="main-navigation-logo" onClick={closeMenu}>
          <PiBookOpenBold
            className="main-navigation-book-logo"
            color="#14c78e"
          />
          <div className="main-navigation-logo-container">
            <span className="main-navigation-logo-first">Beyond</span>
            <span className="main-navigation-logo-second">
              <span className="main-navigation-logo-the">The</span> Blackboard
            </span>
          </div>
        </Link>
      </div>

      <div
        className={`nav-overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`main-navigation-content ${isOpen ? "open" : ""}`}>
        <div className="main-navigation-group">
          <Link
            to="/"
            className="nav-link main-navigation-item"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="nav-link main-navigation-item"
            onClick={closeMenu}
          >
            Courses
          </Link>
          {isAuthenticated && (
            <Link
              to="/course-creation"
              className="nav-link main-navigation-item"
              onClick={closeMenu}
            >
              Course Creation
            </Link>
          )}
          <Link
            to="/for-students"
            className="nav-link main-navigation-item"
            onClick={closeMenu}
          >
            For Students
          </Link>
          <Link
            to="/for-educators"
            className="nav-link main-navigation-item"
            onClick={closeMenu}
          >
            For Educators
          </Link>
          {isAuthenticated && (
            <Link
              to="/ai-tools"
              className="nav-link main-navigation-item"
              onClick={closeMenu}
            >
              AI Tools
            </Link>
          )}
        </div>

        <div className="main-navigation-right-section">
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <Link
                to="/login"
                className="nav-link auth-navigation-item"
                onClick={closeMenu}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="nav-link auth-navigation-item signup-button"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
              <Link
                to="/cart"
                className="nav-link cart-button auth-navigation-item"
                onClick={closeMenu}
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className={`cart-badge ${isPulsing ? "pulse" : ""}`}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <div
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="nav-link auth-navigation-item"
              >
                Logout
              </div>
              <Link
                to="/cart"
                className="nav-link cart-button auth-navigation-item"
                onClick={closeMenu}
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className={`cart-badge ${isPulsing ? "pulse" : ""}`}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
