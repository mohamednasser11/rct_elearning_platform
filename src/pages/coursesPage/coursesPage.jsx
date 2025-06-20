import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./coursesPage.css";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import { coursesData as defaultCourses } from "../../data/coursesData";
import {
  FaStar,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaBookReader,
  FaSearch,
  FaSortAmountDown,
  FaRegClock,
  FaUserGraduate,
} from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useDepartment } from "../../contexts/departmentContext";

// Custom hook for debouncing values
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CoursesPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const {
    courses: coursesArray,
    setCourses,
    setCurrentCourseId,
    currentCourseId,
  } = useDepartment();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    field: searchParams.get("field") || "All",
    priceRange: "All",
    rating: "All",
    myCourses: false,
  });
  const [activeTab, setActiveTab] = useState("categories");
  const [myCourses, setMyCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesData, setCoursesData] = useState([]); // Initialize with static data
  const [sortOption, setSortOption] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 15,
    offset: 0,
  });
  const [error, setError] = useState(null);
  const [totalNumberOfCourses, setTotalNumberOfCourses] = useState(0);
  const [fields, setFields] = useState(["All"]);

  const coursesRef = useRef(null);
  // Object to store refs for course cards
  const courseCardRefs = useRef({});
  // Store the IntersectionObserver instance in a ref
  const observerRef = useRef(null);
  // Add error state for handling errors

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay
  // Responsive courses per page based on screen width
  const getCoursesPerPage = () => {
    const width = window.innerWidth;
    if (width < 480) return 7; // Mobile
    if (width < 768) return 9; // Tablet
    if (width < 1200) return 12; // Small desktop
    return 15; // Large desktop
  };

  const [coursesPerPage, setCoursesPerPage] = useState(getCoursesPerPage());
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  //const fields = ['All', ...new Set(coursesData.map(course => course.field || 'Other'))]; // Extract unique fields from coursesData
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $150", min: 100, max: 150 },
    { label: "Over $150", min: 150, max: Infinity },
  ];
  const ratings = ["All", "4.8 & up", "4.5 & up", "4.0 & up"];
  const getUsersCourses = async () => {
    try {
      const token = Cookies.get("refresh_token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/courses/?userId=${user.id}`,
        config
      );
      console.log("User courses response:", response.data);
      return response.data || [];
    } catch (error) {
      setError("Failed to fetch user courses. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchUserCourseIds = async () => {
      if (filters.myCourses) {
        const userCourses = await getUsersCourses();
        const ids = userCourses.map((course) => course.courseId);
        setMyCourses(ids);
      } else {
        setMyCourses([]);
      }
    };

    fetchUserCourseIds();
  }, [filters.myCourses]);

  useEffect(() => {
    try {
      const fetchFields = async () => {
        const token = Cookies.get("refresh_token") || "";
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/courses/?fields=true`,
          config
        );

        if (response?.data.fields) {
          setFields(["All", ...response.data.fields]);
        }
      };

      fetchFields();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = Cookies.get("refresh_token") || "";

        const config = {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/courses/?limit=${
            pagination.limit
          }&offset=${pagination.offset}`,
          config
        );

        if (isMounted) {
          const processedData = response.data.data.map((course) => ({
            ...course,
            id: course.courseId,
            price: parseFloat(course.price),
			image_url: `${import.meta.env.VITE_BASE_URL}${course.image_url}`
          }));

          setCoursesData(processedData);
          setCourses(processedData);
          setTotalNumberOfCourses(response.data.count || processedData.length);
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          console.error("Fetch error:", err);
          setError("Failed to load courses. Showing default data.");
          const fallbackData = defaultCourses
            .slice(pagination.offset, pagination.offset + pagination.limit)
            .map((course) => ({
              ...course,
              id: course.courseId || course.id,
              price: parseFloat(course.price),
            }));

          // Option 1: Replace courses (recommended for clean fallback)
          setCoursesData(fallbackData);
          setCourses(fallbackData);
          setTotalNumberOfCourses(defaultCourses.length);
          setFields([
            "All",
            "Writing",
            "Data Science",
            "Photography",
            "IT Security",
            "Business",
            "Design",
            "Finance",
            "Music",
            "Cloud Computing",
            "Technology",
            "Programming",
            "Health",
            "DevOps",
            "IT",
            "Marketing",
          ]);
          setFilters({
            field: "All",
            priceRange: "All",
            rating: "All",
            myCourses: false,
          });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [pagination]); // Fetch courses when pagination changes

  // Memoize filtered and sorted courses to prevent unnecessary recalculations
  const courses = useMemo(() => {
    try {
      const isDefaultData = coursesData === defaultCourses;

      if (
        isDefaultData &&
        (filters.field !== "All" ||
          filters.priceRange !== "All" ||
          filters.rating !== "All" ||
          debouncedSearchTerm.trim() !== "" ||
          filters.myCourses)
      ) {
        return []; // Don't filter defaultCourses if any filter is active
      }

      // Return empty array if data isn't loaded yet
      if (isLoading || coursesData.length === 0) return [];

      let filteredCourses = [...coursesData]; // Create a new array to avoid mutating original

      // Field filter
      if (filters.field !== "All") {
        filteredCourses = filteredCourses.filter(
          (course) =>
            course.field?.toLowerCase() === filters.field.toLowerCase()
        );
      }

      // Price filter
      if (filters.priceRange !== "All") {
        filteredCourses = filteredCourses.filter((course) => {
          const price = Number(course.price); // Ensure price is a number

          if (filters.priceRange === "Free") return price === 0;
          if (filters.priceRange === "Paid") return price > 0;

          const selectedRange = priceRanges.find(
            (range) => range.label === filters.priceRange
          );
          return selectedRange
            ? price >= selectedRange.min && price < selectedRange.max
            : true;
        });
      }

      // Rating filter
      if (filters.rating !== "All") {
        const minRating = parseFloat(filters.rating.split(" ")[0]);
        filteredCourses = filteredCourses.filter(
          (course) => Number(course.rating) >= minRating
        );
      }

      // Search filter
      if (debouncedSearchTerm.trim() !== "") {
        const search = debouncedSearchTerm.toLowerCase();
        filteredCourses = filteredCourses.filter(
          (course) =>
            course.title?.toLowerCase().includes(search) ||
            course.description?.toLowerCase().includes(search) ||
            course.field?.toLowerCase().includes(search)
        );
      }

      //filter my courses
      if (filters.myCourses && myCourses.length > 0) {
        filteredCourses = filteredCourses.filter((course) =>
          myCourses.includes(course.id)
        );
      }

      // Sorting
      switch (sortOption) {
        case "popularity":
          filteredCourses.sort(
            (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
          );
          break;
        case "rating":
          filteredCourses.sort((a, b) => Number(b.rating) - Number(a.rating));
          break;
        case "alphabetical":
          filteredCourses.sort((a, b) => a.title?.localeCompare(b.title));
          break;
        case "price-low":
          filteredCourses.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case "price-high":
          filteredCourses.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        default:
          break;
      }

      return filteredCourses;
    } catch (err) {
      console.error("Error filtering courses:", err);
      setError("An error occurred while filtering courses. Please try again.");
      return coursesData; // Return unfiltered data as fallback
    }
  }, [coursesData, filters, debouncedSearchTerm, sortOption, isLoading]); // Added isLoading

  // Calculate total pages based on filtered courses
  const totalPages = Math.ceil(totalNumberOfCourses / coursesPerPage);

  const currentCourses = useMemo(() => {
    return courses.slice(indexOfFirstCourse, indexOfLastCourse);
  }, [courses, indexOfFirstCourse, indexOfLastCourse]);

  // Handle window resize for responsive courses per page
  useEffect(() => {
    const handleResize = () => {
      setCoursesPerPage(getCoursesPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setVisibleCards([]);
  }, [filters, debouncedSearchTerm, sortOption]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [filters, debouncedSearchTerm, sortOption, currentPage]);

  // Reset error state when filters change
  useEffect(() => {
    setError(null);
  }, [filters, debouncedSearchTerm, sortOption]);

  // Update filters when URL parameters change
  useEffect(() => {
    const fieldParam = searchParams.get("field");
    if (fieldParam) {
      setFilters((prev) => ({
        ...prev,
        field: fieldParam,
      }));
    }
  }, [searchParams]);
  useEffect(() => {
    console.log("Current courses state:", {
      fetchedData: coursesData,
      filtered: courses,
      currentPageCourses: currentCourses,
      visibleCards,
    });
  }, [coursesData, courses, currentCourses, visibleCards]);
  // Intersection Observer for lazy loading cards
  useEffect(() => {
    if (isLoading || currentCourses.length === 0) return;

    const cleanupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      cleanupObserver();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const courseId = entry.target.dataset.id;
              setVisibleCards((prev) => [...new Set([...prev, courseId])]);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe only visible cards that aren't already visible
      currentCourses.forEach((course) => {
        const ref = courseCardRefs.current[course.id];
        if (ref && !visibleCards.includes(course.id)) {
          observerRef.current.observe(ref);
        }
      });
    }, 100);

    return () => {
      cleanupObserver();
      clearTimeout(timer);
    };
  }, [currentCourses, isLoading]);

  // Function to create or get a ref for a course card
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
    console.log("Changing pagination to page:", pageNumber);
    console.log("totalPages:", totalPages);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    const newOffset = (pageNumber - 1) * coursesPerPage;
    const newLimit = coursesPerPage;

    setPagination({
      limit: newLimit,
      offset: newOffset,
    });

    setCurrentPage(pageNumber);
  };

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    changePagination(pageNumber);
    // Scroll to courses section instead of top of page
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
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

  // Navigate to course detail page
  const navigateToCourse = (courseId, event) => {
    // Prevent the click event from bubbling up to parent elements
    setCurrentCourseId(courseId);
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
          <div className="category-icon">{/* <FaBookReader /> */}</div>
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
              {fields.map((field) => {
                const count =
                  field === "All"
                    ? coursesData.length
                    : coursesData.filter((course) => course.field === field)
                        .length;

                return (
                  <button
                    key={field}
                    className={`category-btn ${
                      filters.field === field ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("field", field)}
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
              {["All", "Free", "Paid"].map((option) => {
                const count =
                  option === "All"
                    ? coursesData.length
                    : option === "Free"
                    ? coursesData.filter((course) => course.price === 0).length
                    : coursesData.filter((course) => course.price > 0).length;

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

          {isAuthenticated && (
            <div className="categories-container">
              {["My courses"].map((option) => {
                return (
                  <button
                    key={option}
                    className={`category-btn ${
                      filters.myCourses === true ? "active" : ""
                    }`}
                    onClick={async () => {
                      setFilters((prev) => ({
                        ...prev,
                        myCourses: !prev.myCourses,
                      }));
                      if (filters.myCourses === true) {
                        await getUsersCourses();
                      } else {
                        setCourses(coursesData);
                      }
                    }}
                  >
                    {option === "My courses" ? "My courses" : option}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Rating:</label>
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
        ) : error ? (
          // Error fallback UI
          <div className="error-container">
            <FaRegClock size={48} className="error-icon" />
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setError(null);
                setFilters({
                  field: "All",
                  priceRange: "All",
                  rating: "All",
                });
                setSearchTerm("");
                setSortOption("popularity");
              }}
            >
              Reset and Try Again
            </button>
          </div>
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
          // Course cards with animation
          currentCourses.map((course) => {
            const isVisible = visibleCards.includes(course.id.toString());
            return (
              <div
                key={course.id}
                ref={getCardRef(course.id)}
                className={`course-card ${isVisible ? "visible" : ""}`}
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
                      <button
                        className="add-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(course);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
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

      {courses.length > 0 && (
        <div className="pagination">
          {/* {renderPagination()} */}
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
