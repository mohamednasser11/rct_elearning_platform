import React, { useState, useEffect, useRef, useCallback } from "react";
import "./coursesPage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import {
  FaStar,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
  FaRegClock,
  FaUserGraduate,
} from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import { useDepartment } from "../../contexts/departmentContext";
import courseService from "../../services/courseService";

const ratings = ["All", "4.8 & up", "4.5 & up", "4.0 & up"];
const coursesPerPage = 12;

const CoursesPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { departments, courses, loading } = useDepartment();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    field: 0,
    priceRange: "All",
    rating: "All",
    myCourses: false,
  });
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [pageCourses, setPageCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const coursesRef = useRef(null);
  const courseCardRefs = useRef({});

  const [isLoading, setIsLoading] = useState(loading);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const fetchEnrolled = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setIsLoading(true);
      const newEnrolledCourses = await courseService.getEnrolled(user.id);
      setEnrolledCourses(newEnrolledCourses);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchEnrolled();
  }, [fetchEnrolled]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      field:
        Object.keys(departments).find(
          (dep) => departments[dep] == searchParams.get("category"),
        ) || "0",
    }));
  }, [departments, searchParams]);

  useEffect(() => {
    if (departments[filters.field]) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("category", departments[filters.field]);
      setSearchParams(newParams);
    }
  }, [departments, filters.field, searchParams, setSearchParams]);

  useEffect(() => {
    let newCourses = [...courses];

    if (filters.myCourses && isAuthenticated) {
      newCourses = newCourses.filter(
        (course) => course.instructorId == user.id,
      );
    }

    switch (filters.priceRange) {
      case "Free":
        newCourses = newCourses.filter((course) => course.price == 0);
        break;

      case "Paid":
        newCourses = newCourses.filter((course) => course.price > 0);
        break;

      default:
        break;
    }

    switch (filters.rating) {
      case "4.8 & up":
        newCourses = newCourses.filter((course) => course.rating >= 4.8);
        break;

      case "4.5 & up":
        newCourses = newCourses.filter((course) => course.rating >= 4.5);
        break;

      case "4.0 & up":
        newCourses = newCourses.filter((course) => course.rating >= 4.0);
        break;

      default:
        break;
    }

    if (filters.field > 0) {
      newCourses = newCourses.filter((course) => {
        return course.departmentId == filters.field;
      });
    }

    const search = searchTerm.toLowerCase();
    newCourses = newCourses.filter(
      (course) =>
        course.title?.toLowerCase().includes(search) ||
        course.description?.toLowerCase().includes(search) ||
        course.field?.toLowerCase().includes(search),
    );

    switch (sortOption) {
      case "popularity":
        newCourses.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;

      case "rating":
        newCourses.sort((a, b) => b.rating - a.rating);
        break;

      case "alphabetical":
        newCourses.sort((a, b) => a.title?.localeCompare(b.title));
        break;

      case "price-low":
        newCourses.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        newCourses.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredCourses(newCourses);
    setCurrentPage(1);
  }, [courses, filters, searchTerm, sortOption]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCourses.length / coursesPerPage));
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

    let newCourses = [...filteredCourses];
    newCourses = newCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    setPageCourses(newCourses);
  }, [currentPage, filteredCourses]);

  const getCardRef = useCallback((id) => {
    return (element) => {
      if (element) {
        courseCardRefs.current[id] = element;
      }
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const changePagination = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (pageNumber) => {
    changePagination(pageNumber);
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const navigateToCourse = (courseId, event) => {
    event.stopPropagation();
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>
          Discover a wide range of courses designed to enhance your skills and
          knowledge. From technology to arts, we have something for everyone.
        </p>

        <div className="search-sort-container">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="sort-container">
            <FaSortAmountDown className="sort-icon" />
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="students">Most Enrolled</option>
              <option value="duration">Course Duration</option>
            </select>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <div className="section-heading">
          <h2>
            <FaFilter className="filter-icon" />
            Filter Courses
          </h2>
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <h3>Categories</h3>
            <div className="categories-container">
              {isAuthenticated && !user.isStudent && (
                <div className="categories-container">
                  <button
                    className={`category-btn ${
                      filters.myCourses === true ? "active" : ""
                    }`}
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        myCourses: !prev.myCourses,
                      }));
                    }}
                  >
                    My courses
                  </button>
                  <div>|</div>
                </div>
              )}

              {Object.keys(departments).map((dep) => {
                return (
                  <button
                    key={dep}
                    className={`category-btn ${
                      filters.field === dep ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("field", dep)}
                  >
                    {departments[dep]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <div className="categories-container">
              {["All", "Free", "Paid"].map((option) => {
                return (
                  <button
                    key={option}
                    className={`category-btn ${
                      filters.priceRange === option ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("priceRange", option)}
                  >
                    {option === "All" ? "All Prices" : option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <h3>Rating</h3>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="courses-container" ref={coursesRef}>
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: coursesPerPage }).map((_, index) => (
            <div key={`skeleton-${index}`} className="course-card skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-meta">
                  <div className="skeleton-tag"></div>
                  <div className="skeleton-tag"></div>
                </div>
                <div className="skeleton-footer">
                  <div className="skeleton-rating"></div>
                  <div className="skeleton-price"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
          ))
        ) : pageCourses.length === 0 ? (
          <div className="no-courses-message">
            <FaRegClock size={48} />
            <h3>No courses found</h3>
            <p>Try adjusting your filters or search term</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setFilters({
                  field: "All",
                  priceRange: "All",
                  rating: "All",
                });
                setSearchTerm("");
                setSortOption("popularity");
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          pageCourses.map((course) => {
            return (
              <div
                key={course.id}
                ref={getCardRef(course.id)}
                className={"course-card  visible"}
                data-id={course.id}
                onClick={(e) => navigateToCourse(course.id, e)}
              >
                {course.number_of_students > 10000 && (
                  <div className="popular-badge">Popular</div>
                )}
                <div className="price-badge">
                  $
                  {course.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="image-container">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="course-image"
                    loading="lazy"
                  />
                  <div className="hover-overlay">
                    <div className="overlay-buttons">
                      <button
                        className="quick-view-btn"
                        onClick={(e) => navigateToCourse(course.id, e)}
                      >
                        View Course
                      </button>
                      {enrolledCourses.find((c) => c.courseId == course.id) ==
                      undefined ? (
                        <button
                          className="add-cart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(course);
                          }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="course-content">
                  <div className="course-meta">
                    <span className="course-field">
                      {departments[course.departmentId]}
                    </span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className="course-footer">
                    <div className="course-rating">
                      <FaStar className="star-icon" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="course-duration">
                      <FaRegClock className="clock-icon" />
                      <span>{course.duration || 50}</span>
                    </div>
                    <div className="students-count">
                      <FaUserGraduate className="student-icon" />
                      <span>
                        {(course.number_of_students || 2000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {pageCourses.length > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Prev page"
          >
            Prev
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
