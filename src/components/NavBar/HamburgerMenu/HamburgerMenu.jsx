import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { PiBookOpenBold } from "react-icons/pi";
import "./HamburgerMenu.css";

const HamburgerMenu = ({
  isCategoryMenuOpen,
  setIsCategoryMenuOpen,
  courseCategories,
  categoriesExpanded,
  setCategoriesExpanded,
  isAuthenticated,
  logout,
  closeCategoryMenu,
}) => {
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isCategoryMenuOpen
      ) {
        closeCategoryMenu();
      }
    };

    // Close sidebar on escape key
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isCategoryMenuOpen) {
        closeCategoryMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    // Lock body scroll when sidebar is open
    if (isCategoryMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isCategoryMenuOpen, closeCategoryMenu]);

  return (
    <>
      {/* Categories hamburger menu */}
      <div
        className="categories-hamburger-menu"
        onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
        aria-label={isCategoryMenuOpen ? "Close menu" : "Open menu"}
        role="button"
        tabIndex="0"
      >
        <FaBars className="menu-icon" aria-hidden="true" />
      </div>

      {/* Categories menu overlay */}
      <div
        className={`categories-overlay ${isCategoryMenuOpen ? "show" : ""}`}
        onClick={closeCategoryMenu}
        aria-hidden="true"
      ></div>

      {/* Categories sidebar */}
      <div
        className={`categories-sidebar ${isCategoryMenuOpen ? "open" : ""}`}
        ref={sidebarRef}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="categories-sidebar-header">
          <div className="sidebar-logo">
            <PiBookOpenBold
              className="sidebar-book-logo"
              color="#0fb480"
              aria-hidden="true"
            />
            <div className="sidebar-logo-container">
              <span className="sidebar-logo-first">Beyond</span>
              <span className="sidebar-logo-second">
                <span className="sidebar-logo-the">The</span> Blackboard
              </span>
            </div>
          </div>
          <button
            className="sidebar-close-button"
            onClick={closeCategoryMenu}
            aria-label="Close sidebar menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-navigation">
          {/* Categories dropdown */}
          <div className="category-dropdown">
            <div
              className={`category-dropdown-header ${categoriesExpanded ? "expanded" : ""}`}
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              role="button"
              aria-expanded={categoriesExpanded}
              aria-controls="categories-list"
              tabIndex="0"
            >
              <span>Course Categories</span>
              <div
                className={`dropdown-icon ${categoriesExpanded ? "expanded" : ""}`}
              >
                {categoriesExpanded ? "-" : "+"}
              </div>
            </div>

            <div id="categories-list" className="categories-list">
              {courseCategories.map((category, index) => (
                <Link
                  key={index}
                  to={
                    category == "All"
                      ? "/courses"
                      : `/courses?category=${category}`
                  }
                  className="category-item"
                  onClick={closeCategoryMenu}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/" className="sidebar-nav-item" onClick={closeCategoryMenu}>
            Home
          </Link>
          <Link
            to="/for-students"
            className="sidebar-nav-item"
            onClick={closeCategoryMenu}
          >
            For Students
          </Link>
          <Link
            to="/for-educators"
            className="sidebar-nav-item"
            onClick={closeCategoryMenu}
          >
            For Educators
          </Link>
          <Link
            to="/ai-tools"
            className="sidebar-nav-item ai-tools-item"
            onClick={closeCategoryMenu}
          >
            AI Tools
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="sidebar-nav-item auth-btn login-btn"
                onClick={closeCategoryMenu}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="sidebar-nav-item auth-btn signup-btn"
                onClick={closeCategoryMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div
              onClick={() => {
                logout();
                closeCategoryMenu();
              }}
              className="sidebar-nav-item"
              role="button"
              tabIndex="0"
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
