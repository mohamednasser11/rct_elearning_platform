import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegClock, FaUserGraduate, FaArrowLeft, FaPlay, FaChalkboardTeacher, FaBook, FaInfoCircle, FaComments, FaDownload, FaLock, FaList, FaCheck } from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';
import { useCart } from '../../../contexts/cartContext.jsx';
import { coursesData } from '../../../data/coursesData';
import './CourseDetail.css';
import CourseVideo from './CourseVideo';
import CourseOutline from './CourseOutline';
import { FiCheckCircle } from "react-icons/fi";

// Sample curriculum data as a fallback
const sampleCurriculum = [
  {
    title: "Introduction to the Course",
    duration: "45 mins",
    lessons: [
      {
        id: "1-1",
        title: "Course Overview",
        duration: "10:00",
        type: "Video",
        description: "Welcome to the course! This lesson introduces what you'll learn and how to get the most out of the material.",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "1-2",
        title: "Getting Started",
        duration: "15:00",
        type: "Video",
        description: "Learn how to set up your environment and prepare for the lessons ahead."
      },
      {
        id: "1-3",
        title: "Course Resources",
        duration: "20:00",
        type: "Video",
        description: "Overview of the resources, tools, and materials you'll need for this course."
      }
    ]
  },
  {
    title: "Core Concepts",
    duration: "2 hours",
    lessons: [
      {
        id: "2-1",
        title: "Fundamentals",
        duration: "25:00",
        type: "Video",
        description: "Learn the basics and how to structure your work effectively."
      },
      {
        id: "2-2",
        title: "Advanced Techniques",
        duration: "30:00",
        type: "Video",
        description: "Master techniques to create professional results."
      },
      {
        id: "2-3",
        title: "Practical Application",
        duration: "35:00",
        type: "Video",
        description: "Apply what you've learned to real-world scenarios."
      }
    ]
  }
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [similarCourses, setSimilarCourses] = useState([]);
  
  // Calculate total lessons from curriculum
  const curriculum = useMemo(() => {
    return sampleCurriculum; // Use sample curriculum since coursesData doesn't have curriculum
  }, []);
  
  const totalLessons = useMemo(() => {
    if (!curriculum) return 0;
    return curriculum.reduce((total, section) => total + (section.lessons?.length || 0), 0);
  }, [curriculum]);
  
  // Check if course is in cart - extracted to separate function for clarity
  const isInCart = useMemo(() => cartItems?.some(item => item.id === course?.id), [cartItems, course]);

  useEffect(() => {
    // Simulate API call to fetch course details
    setTimeout(() => {
      const fetchedCourse = coursesData.find(c => c.id === parseInt(courseId));
      
      if (fetchedCourse) {
        // Add original price for discount demonstration if not already present
        if (!fetchedCourse.originalPrice && fetchedCourse.price) {
          fetchedCourse.originalPrice = Math.round(fetchedCourse.price * 1.2);
        }
        
        // Add sample curriculum if missing
        if (!fetchedCourse.curriculum) {
          fetchedCourse.curriculum = sampleCurriculum;
        }
        
        // Ensure instructor is set
        if (!fetchedCourse.instructor) {
          fetchedCourse.instructor = "John Doe";
        }
        
        // Ensure reviews count
        if (!fetchedCourse.reviews && fetchedCourse.students) {
          fetchedCourse.reviews = Math.round(fetchedCourse.students * 0.25);
        }
        
        setCourse(fetchedCourse);
        
        // Set first lesson as current if available
        if (sampleCurriculum && sampleCurriculum.length > 0 && 
            sampleCurriculum[0].lessons && sampleCurriculum[0].lessons.length > 0) {
          setCurrentLesson(sampleCurriculum[0].lessons[0]);
        }
        
        // Find similar courses
        const similar = findSimilarCourses(fetchedCourse);
        setSimilarCourses(similar);
      } else {
        setError("Course not found");
      }
      
      setLoading(false);
    }, 500);
  }, [courseId]);

  // Find similar courses based on the current course's field
  const findSimilarCourses = (currentCourse) => {
    // Filter courses in the same field, excluding the current course
    let fieldSimilar = coursesData.filter(c => 
      c.field === currentCourse.field && c.id !== currentCourse.id
    );
    
    // If we don't have enough courses in the same field, add some popular courses
    if (fieldSimilar.length < 3) {
      const popularCourses = coursesData.filter(c => 
        c.popular && c.id !== currentCourse.id && c.field !== currentCourse.field
      );
      fieldSimilar = [...fieldSimilar, ...popularCourses];
    }
    
    // Return up to 4 similar courses
    return fieldSimilar.slice(0, 4);
  };

  // Handle back button click
  const handleBack = () => {
    navigate('/courses');
  };

  // Handle lesson selection - Enhanced with better name and comments
  const handleLessonSelect = (selectedLesson) => {
    // Save the selected lesson to state
    setCurrentLesson(selectedLesson);
    
    // Scroll to the lesson content if on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setTimeout(() => {
        document.querySelector('.lesson-content')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Handle add to cart with animation feedback
  const handleAddToCart = (courseToAdd) => {
    addToCart(courseToAdd);
    
    // Visual feedback for add to cart action
    const enrollButton = document.querySelector('.enrollment-button');
    if (enrollButton) {
      enrollButton.classList.add('button-pulse');
      setTimeout(() => enrollButton.classList.remove('button-pulse'), 500);
    }
  };

  if (loading) {
    return (
      <div className="course-detail-container">
        <div className="course-detail-loading">
          <div className="spinner"></div>
          <h2>Loading course...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-detail-container">
        <div className="course-detail-error">
          <h2>Error loading course</h2>
          <p>{error}</p>
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft /> Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      {/* Course Header with Back Button, Title, Description, and Meta Info */}
      <div className="course-header-section">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft /> Back to Courses
        </button>
        
        <div className="course-filed">
          
          {course.field && (
            <a href={`/courses?category=${course.field}`} className="course-category-tag">
              {course.field}
            </a>
          )}
          {!course.field && (
            <a href="/courses?category=General" className="course-category-tag">General</a>
          )}
        </div>
        
        <h1 className="course-title">{course.title}</h1>
        
        <p className="course-brief-description">{course.shortDescription || "Master the essential skills and concepts in this comprehensive course designed for all levels."}</p>
        
        <div className="course-meta-info">
          <div className="meta-item">
            <FaStar className="meta-icon" />
            <span>{course.rating || "4.8"} ({course.reviews || "235"} reviews)</span>
      </div>

          <div className="meta-item">
            <FaRegClock className="meta-icon" />
            <span>{course.duration || "10 hours"}</span>
              </div>
          
          <div className="meta-item">
            <MdOndemandVideo className="meta-icon" />
            <span>{totalLessons} lessons</span>
            </div>
        </div>
      </div>

      {/* Course Enrollment Card */}
      <div className="course-enrollment-card">
        <div className="enrollment-video-container">
          {currentLesson ? (
            <CourseVideo lesson={currentLesson} />
          ) : (
            <div className="enrollment-thumbnail" style={{ 
              backgroundImage: `url(${course.image || course.thumbnail || '/course-thumbnail.jpg'})`
            }}>
              <div className="play-overlay">
                <div className="play-button">
                  <FaPlay />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="enrollment-details">
          <div className="enrollment-price-container">
            <div className="enrollment-price">
              <span className="dollar-sign">$</span>
              {course.price}
            </div>
            
            {course.originalPrice && course.originalPrice > course.price && (
              <div className="original-price">
                <span className="dollar-sign">$</span>
                {course.originalPrice}
              </div>
            )}
            
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="discount-badge">
                {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% discount - 2 days left
              </span>
            )}
          </div>
          
          <div className="enrollment-features">
            <div className="enrollment-feature">
              <FaRegClock className="feature-icon" />
              <span>{course.duration} of content</span>
            </div>
            <div className="enrollment-feature">
              <FaChalkboardTeacher className="feature-icon" />
              <span>Full lifetime access</span>
            </div>
            <div className="enrollment-feature">
              <FaBook className="feature-icon" />
              <span>{totalLessons} lessons</span>
            </div>
          </div>
          
          <button 
            className={`enrollment-button ${isInCart ? 'in-cart' : ''}`}
            onClick={() => isInCart ? navigate('/cart') : handleAddToCart(course)}
          >
            {isInCart ? 'Go to Cart' : 'Enroll Now'}
          </button>
          
          {!isInCart && (
            <p className="secure-payment-note">
              <FaLock className="lock-icon" /> Secure payment
            </p>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="course-detail-content">
        <div className="course-main-content">
          <div className="course-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaInfoCircle className="tab-icon" /> Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              <FaBook className="tab-icon" /> Curriculum
            </button>
            <button 
              className={`tab-button ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
            >
              <FaChalkboardTeacher className="tab-icon" /> Instructor
            </button>
            <button 
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <FaComments className="tab-icon" /> Reviews
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="course-overview">
                {/* About This Course Section */}
                <div className="overview-section">
                  <h3 className="section-title">About This Course</h3>
                  <p className="section-content">{course.description}</p>
                </div>
                
                {/* What You'll Learn Section */}
                <div className="overview-section">
                  <h3 className="section-title">What You'll Learn</h3>
                  <ul className="benefits-list">
                    {course.features ? (
                      course.features.map((feature, index) => (
                        <li key={index} className="benefit-item">
                          <span className="check-icon"><FiCheckCircle /></span> {feature}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="benefit-item"><span className="check-icon"><FiCheckCircle /></span> Master the fundamentals and advanced concepts of {course.title}</li>
                        <li className="benefit-item"><span className="check-icon"><FiCheckCircle /></span> Build real-world projects to apply your knowledge</li>
                        <li className="benefit-item"><span className="check-icon"><FiCheckCircle /></span> Learn best practices and industry standards</li>
                        <li className="benefit-item"><span className="check-icon"><FiCheckCircle /></span> Gain confidence in working with {course.field || 'this field'} technologies</li>
                        <li className="benefit-item"><span className="check-icon"><FiCheckCircle /></span> Get hands-on experience through practical exercises</li>
                      </>
                    )}
                  </ul>
                </div>
                
                {/* Requirements Section */}
                <div className="overview-section">
                  <h3 className="section-title">Requirements</h3>
                  <ul className="requirements-list">
                    <li className="requirement-item">Basic understanding of {course.field || 'this subject'} concepts</li>
                    <li className="requirement-item">A computer with internet access</li>
                    <li className="requirement-item">Enthusiasm and willingness to learn</li>
                  </ul>
                </div>
                
                {/* Who This Course Is For Section */}
                <div className="overview-section">
                  <h3 className="section-title">Who This Course Is For</h3>
                  <ul className="audience-list">
                    <li className="audience-item">Beginners with no prior experience in {course.field || 'this field'}</li>
                    <li className="audience-item">Intermediate learners looking to expand their knowledge</li>
                    <li className="audience-item">Professionals wanting to stay updated with the latest trends</li>
                    <li className="audience-item">Anyone interested in learning {course.title}</li>
                  </ul>
                </div>
                
                {/* Course Features Section */}
                <div className="overview-section">
                  <h3 className="section-title">Course Features</h3>
                  <div className="overview-features">
                    <ul>
                      <li><span className="feature-icon"><FaRegClock /></span> <span className="feature-text">Duration: {course.duration || '10 weeks'}</span></li>
                      <li><span className="feature-icon"><MdOndemandVideo /></span> <span className="feature-text">Lessons: {totalLessons}</span></li>
                      <li><span className="feature-icon"><FaDownload /></span> <span className="feature-text">Downloadable resources: 15+</span></li>
                      <li><span className="feature-icon"><FaChalkboardTeacher /></span> <span className="feature-text">Full lifetime access</span></li>
                      <li><span className="feature-icon"><FaComments /></span> <span className="feature-text">Q&A support</span></li>
                    </ul>
                  </div>
                </div>
                
                {/* Similar Courses You Might Like Section */}
                {similarCourses.length > 0 && (
                  <div className="similar-courses-section">
                    <h3 className="section-title">Similar Courses You Might Like</h3>
                    <div className="similar-courses-grid">
                      {similarCourses.map(similarCourse => (
                        <div key={similarCourse.id} className="similar-course-card" onClick={() => navigate(`/courses/${similarCourse.id}`)}>
                          <div className="similar-course-image">
                            <img src={similarCourse.image} alt={similarCourse.title} />
                          </div>
                          <div className="similar-course-info">
                            <h4 className="similar-course-title">{similarCourse.title}</h4>
                            <div className="similar-course-meta">
                              <div className="similar-course-rating">
                                <FaStar className="star-icon" />
                                <span>{similarCourse.rating}</span>
                              </div>
                              <div className="similar-course-price">${similarCourse.price}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'curriculum' && (
              <CourseOutline 
                course={course} 
                currentLesson={currentLesson} 
                onSelectLesson={handleLessonSelect} 
              />
            )}
            
            {activeTab === 'instructor' && (
              <div className="course-instructor">
                <h2>Meet Your Instructor</h2>
                <div className="instructor-profile">
                  <div className="instructor-image">
                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Instructor" />
                  </div>
                  <div className="instructor-info">
                    <h3>{course.instructor || "John Doe"}</h3>
                    <p className="instructor-title">Senior Instructor & Industry Expert</p>
                    <div className="instructor-stats">
                      <div className="stat-item">
                        <span className="stat-value">4.8</span>
                        <span className="stat-label">Instructor Rating</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">12,345</span>
                        <span className="stat-label">Students</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">15</span>
                        <span className="stat-label">Courses</span>
                      </div>
                    </div>
                    <p className="instructor-bio">
                      With over 10 years of industry experience, our instructor brings real-world expertise to this course. 
                      They have worked with leading companies and have a passion for teaching and helping students achieve their goals.
                      Their teaching approach combines theoretical knowledge with practical applications, making complex concepts easy to understand.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="course-reviews">
                <h2>Student Reviews</h2>
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <span className="rating-value">{course.rating || "4.8"}</span>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className={star <= Math.floor(course.rating || 4.8) ? "star-filled" : "star-empty"} />
                      ))}
                    </div>
                    <span className="rating-count">{course.reviews || "235"} reviews</span>
                  </div>
                  <div className="rating-breakdown">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="rating-bar">
                        <span className="rating-level">{rating} stars</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1}%` }}
                          ></div>
                        </div>
                        <span className="rating-percent">{rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="reviews-list">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="review-item">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <img src={`https://i.pravatar.cc/150?img=${review + 10}`} alt="Reviewer" />
                        </div>
                        <div>
                          <h4 className="reviewer-name">Student {review}</h4>
                          <div className="review-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar key={star} className={star <= 5 ? "star-filled" : "star-empty"} />
                            ))}
                            <span className="review-date">2 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="review-content">
                        This course exceeded my expectations. The content is well-structured and the instructor explains complex concepts in a way that's easy to understand. Highly recommended for anyone looking to learn this subject.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
