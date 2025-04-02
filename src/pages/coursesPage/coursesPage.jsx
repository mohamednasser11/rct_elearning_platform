import React, { useState, useEffect } from 'react';
import './CoursesPage.css';
import { useCart } from '../../contexts/cartContext';
import { coursesData } from '../../data/coursesData';
import { FaStar, FaFilter, FaChevronLeft, FaChevronRight, FaBookReader } from 'react-icons/fa';

const CoursesPage = () => {
  const { addToCart } = useCart();
  const [courses, setCourses] = useState(coursesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    field: 'All',
    priceRange: 'All',
    rating: 'All',
    level: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');

  const coursesPerPage = 10;
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const fields = ['All', ...new Set(coursesData.map(course => course.field))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: 'Over $150', min: 150, max: Infinity }
  ];
  const ratings = ['All', '4.8 & up', '4.5 & up', '4.0 & up'];

  const applyFilters = () => {
    let filteredCourses = coursesData;

    if (filters.field !== 'All') {
      filteredCourses = filteredCourses.filter(course => course.field === filters.field);
    }

    if (filters.level !== 'All') {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }

    if (filters.priceRange !== 'All') {
      if (filters.priceRange === 'Free') {
        filteredCourses = filteredCourses.filter(course => course.price === 0);
      } else if (filters.priceRange === 'Paid') {
        filteredCourses = filteredCourses.filter(course => course.price > 0);
      } else {
        const selectedRange = priceRanges.find(range => range.label === filters.priceRange);
        filteredCourses = filteredCourses.filter(
          course => course.price >= selectedRange.min && course.price < selectedRange.max
        );
      }
    }

    if (filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating.split(' ')[0]);
      filteredCourses = filteredCourses.filter(course => course.rating >= minRating);
    }

    setCourses(filteredCourses);
    setCurrentPage(1); // Reset to first page when filters change
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>Discover a wide range of courses designed to enhance your skills and
        knowledge. From technology to arts, we have something for everyone.</p>
        <button 
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filters
        </button>
      </div>

      <div className="categories-section">
        <div className="section-heading">
          <div className="category-icon">
            {/* <FaBookReader /> */}
          </div>
          {/* <h2>
            <img src={filterIcon} alt="Filter" className="filter-icon" />
            Filter Courses
          </h2> */}
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <h3>
              <FaFilter className="filter-icon" />
              Categories
            </h3>
            <div className="categories-container">
              {fields.map(field => {
                const count = field === 'All' 
                  ? coursesData.length 
                  : coursesData.filter(course => course.field === field).length;
                
                return (
                  <button
                    key={field}
                    className={`category-btn ${filters.field === field ? 'active' : ''}`}
                    onClick={() => handleFilterChange('field', field)}
                  >
                    {field}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <div className="categories-container">
              {['All', 'Free', 'Paid'].map(option => {
                const count = option === 'All' 
                  ? coursesData.length 
                  : option === 'Free' 
                    ? coursesData.filter(course => course.price === 0).length 
                    : coursesData.filter(course => course.price > 0).length;
                
                return (
                  <button
                    key={option}
                    className={`category-btn ${filters.priceRange === option ? 'active' : ''}`}
                    onClick={() => handleFilterChange('priceRange', option)}
                  >
                    {option === 'All' ? 'All Prices' : option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`filters-section ${showFilters ? 'show' : ''}`}>
        <div className="filter-group">
          <label>Level:</label>
          <select 
            value={filters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Rating:</label>
          <select 
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            {ratings.map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="courses-container">
        {currentCourses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span className="course-field">{course.field}</span>
                <span className="course-level">{course.level}</span>
              </div>
              <div className="course-footer">
                <div className="course-rating">
                  <FaStar className="star-icon" />
                  <span>{course.rating}</span>
                </div>
                <div className="course-price">${course.price}</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(course)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          className="pagination-btn nav-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {renderPagination()}
        <button 
          className="pagination-btn nav-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CoursesPage;
