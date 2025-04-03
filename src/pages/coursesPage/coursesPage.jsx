import React, { useState, useEffect, useRef } from 'react';
import './CoursesPage.css';
import { useCart } from '../../contexts/cartContext';
import { coursesData } from '../../data/coursesData';
import { FaStar, FaFilter, FaChevronLeft, FaChevronRight, FaBookReader, FaSearch, FaSortAmountDown, FaRegClock, FaUserGraduate } from 'react-icons/fa';

const CoursesPage = () => {
  const { addToCart } = useCart();
  const [courses, setCourses] = useState(coursesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    field: 'All',
    priceRange: 'All',
    rating: 'All'
  });
  const [activeTab, setActiveTab] = useState('categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState([]);
  const coursesRef = useRef(null);

  // Responsive courses per page based on screen width
  const getCoursesPerPage = () => {
    const width = window.innerWidth;
    if (width < 480) return 7; // Mobile
    if (width < 768) return 9; // Tablet
    if (width < 1200) return 12; // Small desktop
    return 15; // Large desktop
  };
  
  const [coursesPerPage, setCoursesPerPage] = useState(getCoursesPerPage());
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const fields = ['All', ...new Set(coursesData.map(course => course.field))];
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
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
      const search = searchTerm.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(search) || 
        course.description.toLowerCase().includes(search) ||
        course.field.toLowerCase().includes(search)
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'popularity':
        filteredCourses = [...filteredCourses].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case 'rating':
        filteredCourses = [...filteredCourses].sort((a, b) => b.rating - a.rating);
        break;
      case 'alphabetical':
        filteredCourses = [...filteredCourses].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-low':
        filteredCourses = [...filteredCourses].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredCourses = [...filteredCourses].sort((a, b) => b.price - a.price);
        break;
      case 'students':
        filteredCourses = [...filteredCourses].sort((a, b) => b.students - a.students);
        break;
      case 'duration':
        filteredCourses = [...filteredCourses].sort((a, b) => {
          const durationA = parseInt(a.duration.split(' ')[0]);
          const durationB = parseInt(b.duration.split(' ')[0]);
          return durationA - durationB;
        });
        break;
      default:
        break;
    }

    // Reset visible cards when filters change
    setVisibleCards([]);
    setCourses(filteredCourses);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle window resize for responsive courses per page
  useEffect(() => {
    const handleResize = () => {
      setCoursesPerPage(getCoursesPerPage());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply filters and search
  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, sortOption]);
  
  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [filters, searchTerm, sortOption, currentPage]);
  
  // Intersection Observer for lazy loading cards
  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const courseId = entry.target.dataset.id;
              if (!visibleCards.includes(courseId)) {
                setVisibleCards(prev => [...prev, courseId]);
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const cardElements = document.querySelectorAll('.course-card');
      cardElements.forEach(card => {
        observer.observe(card);
      });

      return () => {
        cardElements.forEach(card => {
          observer.unobserve(card);
        });
      };
    }
  }, [isLoading, currentCourses, visibleCards]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to courses section instead of top of page
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>Discover a wide range of courses designed to enhance your skills and
        knowledge. From technology to arts, we have something for everyone.</p>
        
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

      <div className="filters-section">


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
        ) : courses.length === 0 ? (
          // No results message
          <div className="no-courses-message">
            <FaRegClock size={48} />
            <h3>No courses found</h3>
            <p>Try adjusting your filters or search term</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setFilters({
                  field: 'All',
                  priceRange: 'All',
                  rating: 'All'
                });
                setSearchTerm('');
                setSortOption('popularity');
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          // Course cards with animation
          currentCourses.map(course => (
            <div 
              key={course.id} 
              className={`course-card ${visibleCards.includes(course.id.toString()) ? 'visible' : ''}`}
              data-id={course.id}
            >
              {course.popular && (
                <div className="popular-badge">Popular</div>
              )}
              <div className="price-badge">${course.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="image-container">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="course-image" 
                  loading="lazy"
                />
                <div className="hover-overlay">
                  <button 
                    className="quick-view-btn"
                    onClick={() => addToCart(course)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="course-content">
                <div className="course-meta">
                  <span className="course-field">{course.field}</span>
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
                    <span>{course.duration}</span>
                  </div>
                  <div className="students-count">
                    <FaUserGraduate className="student-icon" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {courses.length > 0 && (
        <div className="pagination">
        {renderPagination()}
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
