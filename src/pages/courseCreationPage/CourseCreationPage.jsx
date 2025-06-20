import React, { useState, useEffect, useCallback } from "react";
import "./CourseCreationPage.css";
import { LuSparkles } from "react-icons/lu";
import { FaBook, FaVideo, FaDollarSign } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { BsPlayFill } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import Cookies from "js-cookie";
import axios from "axios";
import courseService from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const CourseCreationPage = () => {
  // State for tracking current step
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // State for course preview and pricing
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0);

  const [lessons, setLessons] = useState([]);

  const [department, setDepartment] = useState(0);

  // State for file uploads
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // State for notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [departments, setDepartments] = useState([]);

  const fetchDepartments = useCallback(async () => {
    if (departments.length == 0) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/departments/`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("refresh_token")}`,
            },
          },
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("error fetching departments", error);
      }
    }
  }, [departments.length]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Calculate progress percentage based on current step
  const progressPercentage = (currentStep / 3) * 100;

  // Update the completion-fill style
  const completionFillStyle = {
    width: `${progressPercentage}%`,
  };

  // Handle continue button click
  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      +window.scrollTo(0, 0);
    }
  };

  // Handle previous button click
  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      +window.scrollTo(0, 0);
    }
  };

  // Handle publish button click
  const handlePublish = async () => {
    try {
      const course = await courseService.create(
        department,
        courseTitle,
        courseDescription,
        thumbnailFile,
        price,
      );

      for (const lesson of lessons) {
        await courseService.addLesson(
          course.courseId,
          lesson.title,
          lesson.description,
          lesson.video,
        );
      }

      setNotificationMessage("Course published successfully!");
      setShowNotification(true);
      navigate(`/courses/${course.courseId}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle reset button click - clears all form fields and uploaded media
  const handleReset = () => {
    // Animate the reset buttons before performing the actual reset
    animateResetButtons();

    // Perform the actual reset after animation completes
    setTimeout(() => {
      // Reset all form fields to their initial state
      setCourseTitle("");
      setCourseDescription("");
      setIsFree(true);
      setPrice(0);
      setLessons([]);
      setDepartment(null);

      // Reset file uploads
      setThumbnailFile(null);

      // Reset to first step
      setCurrentStep(1);

      // Show notification message
      setNotificationMessage("All form fields have been reset!");
      setShowNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }, 1000); // Wait for animation to complete
  };

  // Function to create the reset animation
  const createResetAnimation = (buttonElement) => {
    const originalText = buttonElement.textContent || buttonElement.innerText;
    const letters = originalText.split("");
    let isAnimating = false;

    // Replace button text with individual letter spans
    function setupLetterSpans() {
      buttonElement.innerHTML = letters
        .map((letter) => `<span class="letter">${letter}</span>`)
        .join("");
    }

    // Scramble letters with random characters
    function scrambleLetters() {
      const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const letterSpans = buttonElement.querySelectorAll(".letter");
      const duration = 800;
      const steps = 20;
      const stepDuration = duration / steps;

      letterSpans.forEach((span, index) => {
        let step = 0;

        const scrambleInterval = setInterval(() => {
          if (step < steps - 4) {
            span.textContent =
              scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            span.textContent = letters[index];
          }

          step++;

          if (step >= steps) {
            clearInterval(scrambleInterval);
            span.textContent = letters[index];
          }
        }, stepDuration);
      });
    }

    // Shuffle array utility
    function shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }

    // Main mixing animation
    function mixLetters() {
      const letterSpans = buttonElement.querySelectorAll(".letter");

      // Phase 1: Scramble with random characters
      scrambleLetters();

      // Phase 2: Show shuffled original letters
      setTimeout(() => {
        const shuffled = shuffleArray(letters);
        letterSpans.forEach((span, index) => {
          span.textContent = shuffled[index];
        });

        // Phase 3: Return to original order
        setTimeout(() => {
          letterSpans.forEach((span, index) => {
            setTimeout(() => {
              span.textContent = letters[index];
            }, index * 80);
          });
        }, 300);
      }, 400);
    }

    // Initialize the button
    setupLetterSpans();
    buttonElement.classList.add("reset-btn-animated");

    // Return the animation function
    return function startAnimation() {
      if (isAnimating) return false;

      isAnimating = true;
      mixLetters();

      setTimeout(() => {
        isAnimating = false;
      }, 1400);

      return true;
    };
  };

  // Function to animate the reset buttons
  const animateResetButtons = () => {
    const resetBtn = document.querySelector(".reset-btn");
    if (resetBtn) {
      const animateReset = createResetAnimation(resetBtn);
      animateReset();
    }
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        title: "",
        description: "",
        videos: null,
      },
    ]);
  };

  const updateLessonTitle = (index, newTitle) => {
    setLessons((prev) => {
      const updatedLessons = [...prev];
      updatedLessons[index] = {
        ...updatedLessons[index],
        title: newTitle,
      };
      return updatedLessons;
    });
  };

  const updateLessonDescription = (index, newDescription) => {
    setLessons((prev) => {
      const updatedLessons = [...prev];
      updatedLessons[index] = {
        ...updatedLessons[index],
        description: newDescription,
      };
      return updatedLessons;
    });
  };

  const updateLessonVideo = (index, newVideo) => {
    setLessons((prev) => {
      const updatedLessons = [...prev];
      updatedLessons[index] = {
        ...updatedLessons[index],
        video: newVideo,
      };
      return updatedLessons;
    });
  };

  const deleteLesson = (indexToDelete) => {
    setLessons((prevLessons) =>
      prevLessons.filter((_, index) => index !== indexToDelete),
    );
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      // We no longer need to create a preview URL since we're only showing the filename
    }
  };

  return (
    <div className="course-creation-page">
      {/* Notification message */}
      {showNotification && (
        <div className="notification-message">
          <FiAlertCircle className="notification-icon" />
          <span>{notificationMessage}</span>
        </div>
      )}
      <div className="course-builder-container">
        <div className="intro-section">
          <h1 className="intro-title">Course Creation</h1>
          <p className="intro-subtitle">
            Transform your expertise into engaging online courses with our
            streamlined creation process.
          </p>
          <p className="intro-tagline">Simple. Fast. Professional.</p>

          <div className="builder-card">
            <div className="card-top">
              <div className="top-left">
                <LuSparkles className="glitter-icon" />
                <h2>Create Your Course</h2>
              </div>
              <div className="phase-badge">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  />
                </svg>
                <span>Step {currentStep} of 3</span>
              </div>
            </div>

            <div className="completion-bar">
              <div
                className="completion-fill"
                style={completionFillStyle}
              ></div>
            </div>

            <div className="phases-container">
              <div
                className={`phase-column ${currentStep === 1 ? "active" : ""}`}
              >
                <div className="phase-circle">
                  {currentStep > 1 ? <FaCheckCircle /> : "1"}
                </div>
                <p className="phase-title">Course Details</p>
                <p className="phase-subtitle">Basic information</p>
              </div>

              <div
                className={`phase-column ${currentStep === 2 ? "active" : ""}`}
              >
                <div className="phase-circle">
                  {currentStep > 2 ? <FaCheckCircle /> : "2"}
                </div>
                <p className="phase-title">Content & Media</p>
                <p className="phase-subtitle">Curriculum & assets</p>
              </div>

              <div
                className={`phase-column ${currentStep === 3 ? "active" : ""}`}
              >
                <div className="phase-circle">3</div>
                <p className="phase-title">Finalize</p>
                <p className="phase-subtitle">Pricing & publish</p>
              </div>
            </div>
          </div>

          {/* Step 1: Course Information Form Section */}
          {currentStep === 1 && (
            <div className="course-details-card">
              <div className="details-header">
                <div className="icon-circle">
                  <FaBook className="text-icon" />
                </div>
                <h3>Course Information</h3>
              </div>

              <div className="details-form">
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="courseTitle">
                      Course Title <span className="mandatory">*</span>
                    </label>
                    <input
                      type="text"
                      id="courseTitle"
                      placeholder="e.g., Complete Web Development Bootcamp"
                      required
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                    />
                  </div>
                  <div className="input-group dropdown">
                    <label htmlFor="category">
                      Department <span className="mandatory">*</span>
                    </label>
                    <div className="select-container">
                      <select
                        id="category"
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value={0} disabled>
                          Choose department
                        </option>
                        {departments.map((dep, index) => (
                          <option key={index} value={dep.departmentId}>
                            {dep.name}
                          </option>
                        ))}
                      </select>
                      <IoIosArrowDown className="arrow-icon" />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="courseDescription">
                    Course Description <span className="mandatory">*</span>
                  </label>
                  <textarea
                    id="courseDescription"
                    placeholder="Detailed description of your course content, what students will learn, and why they should enroll..."
                    rows="4"
                    required
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content & Media Section */}
          {currentStep === 2 && (
            <>
              {/* Course Media Section */}
              <div className="course-details-card">
                <div className="details-header">
                  <div className="icon-circle">
                    <FaVideo className="text-icon" />
                  </div>
                  <h3>Course Media</h3>
                </div>

                <div className="details-form">
                  <div className="media-upload-container">
                    {/* Thumbnail Upload */}
                    <div className="media-column">
                      <h4>Course Thumbnail</h4>
                      <div
                        className="upload-area"
                        style={
                          thumbnailFile
                            ? {
                                borderColor: "#15a72d",
                                backgroundColor: "rgba(139, 92, 246, 0.05)",
                              }
                            : {}
                        }
                      >
                        {thumbnailFile ? (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              className="upload-icon"
                              style={{ color: "#15a72d", marginBottom: "10px" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                            </div>
                            <p
                              className="upload-text"
                              style={{
                                color: "#15a72d",
                                fontWeight: "600",
                                marginBottom: "4px",
                              }}
                            >
                              {thumbnailFile.name}
                            </p>
                            <p className="upload-specs">
                              Image uploaded successfully • Click to change
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="upload-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                            </div>
                            <p className="upload-text">Upload Thumbnail</p>
                            <p className="upload-specs">1280×720 recommended</p>
                          </>
                        )}
                        <input
                          type="file"
                          id="courseThumbnail"
                          accept="image/*"
                          className="file-input"
                          onChange={handleThumbnailChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Curriculum Section */}
              <div className="course-details-card">
                <div className="details-header">
                  <div className="icon-circle prerequisites-icon">
                    <BsPlayFill className="text-icon" />
                  </div>
                  <h3>Course Curriculum</h3>
                </div>

                <div className="curriculum-content">
                  <h4>Build Your Curriculum</h4>
                  <p>Add your lessons</p>

                  <div className="lessons-list">
                    {lessons.length > 0 ? (
                      lessons.map((lesson, index) => (
                        <div key={index} className="lesson-item">
                          <div className="lesson-content">
                            <div className="lesson-header">
                              <span className="lesson-number">
                                Lesson {index + 1}
                              </span>
                              <button
                                type="button"
                                className="delete-lesson-btn"
                                onClick={() => deleteLesson(index)}
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                className="form-input"
                                placeholder="Lesson title"
                                value={lesson.title}
                                onChange={(e) =>
                                  updateLessonTitle(index, e.target.value)
                                }
                              />
                            </div>

                            <div className="form-group">
                              <textarea
                                className="form-textarea"
                                placeholder="Lesson description"
                                value={lesson.description}
                                onChange={(e) =>
                                  updateLessonDescription(index, e.target.value)
                                }
                                rows="2"
                              ></textarea>
                            </div>

                            <div className="form-group">
                              <div
                                className="upload-area"
                                style={
                                  lesson.video
                                    ? {
                                        borderColor: "#15a72d",
                                        backgroundColor:
                                          "rgba(21, 167, 45, 0.05)",
                                      }
                                    : {}
                                }
                              >
                                {lesson.video ? (
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      className="upload-icon video-icon"
                                      style={{
                                        color: "#15a72d",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                      </svg>
                                    </div>
                                    <p
                                      className="upload-text"
                                      style={{
                                        color: "#15a72d",
                                        fontWeight: "600",
                                        marginBottom: "4px",
                                      }}
                                    >
                                      {lesson.video.name}
                                    </p>
                                    <p className="upload-specs">
                                      Click to change
                                    </p>
                                  </div>
                                ) : (
                                  <>
                                    <div className="upload-icon video-icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                      </svg>
                                    </div>
                                    <p className="upload-text">Select Video</p>
                                  </>
                                )}
                                <input
                                  type="file"
                                  id="courseVideo"
                                  accept="video/*"
                                  className="file-input"
                                  onChange={(e) =>
                                    updateLessonVideo(
                                      index,
                                      e.target.files[0] || null,
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-lessons">No lessons added yet</div>
                    )}

                    <button
                      type="button"
                      className="add-lesson-btn"
                      onClick={addLesson}
                    >
                      <FaPlus />
                      Add Lesson
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Finalize Section */}
          {currentStep === 3 && (
            <>
              {/* Course Pricing Section */}
              <div className="course-details-card">
                <div className="details-header">
                  <div className="icon-circle">
                    <FaDollarSign className="text-icon" />
                  </div>
                  <h3>Course Pricing</h3>
                </div>

                <div className="details-form">
                  {/* Free Course Toggle */}
                  <div className="free-course-toggle">
                    <div className="toggle-content">
                      <h4>Make this course free</h4>
                      <p>Build your audience and gather reviews</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={isFree}
                        onChange={() => setIsFree(!isFree)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Price and Currency Inputs */}
                  <div className="price-currency-container">
                    <div className="input-group price-input">
                      <label htmlFor="coursePrice">Price</label>
                      <div className="price-input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                          type="number"
                          id="coursePrice"
                          value={price || ""}
                          onChange={(e) => {
                            const newPrice =
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);
                            if (newPrice > 5000) {
                              setPrice(5000);
                              // Add error message element
                              const priceInput =
                                document.getElementById("coursePrice");
                              const errorMsg = document.createElement("div");
                              errorMsg.className = "error-message";
                              errorMsg.textContent =
                                "Maximum price allowed is $5000";
                              errorMsg.style.color = "red";
                              errorMsg.style.fontSize = "0.8rem";
                              errorMsg.style.marginTop = "4px";

                              // Insert error message after input
                              priceInput.parentNode.insertBefore(
                                errorMsg,
                                priceInput.nextSibling,
                              );

                              // Remove message after 3 seconds
                              setTimeout(() => {
                                errorMsg.remove();
                              }, 3000);
                            } else {
                              setPrice(newPrice);
                            }
                          }}
                          disabled={isFree}
                          min="0"
                          max="5000"
                          step="5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Preview Section */}
              <div className="course-details-card">
                <div className="details-header">
                  <div className="icon-circle">
                    <LuSparkles className="text-icon" />
                  </div>
                  <h3>Course Preview</h3>
                </div>

                <div className="details-form">
                  <div className="input-group">
                    <label
                      htmlFor="previewTitle"
                      style={{ fontSize: "1.25rem" }}
                    >
                      Course Title
                    </label>
                    <input
                      type="text"
                      id="previewTitle"
                      placeholder="Course subtitle"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      style={{ height: "60px" }} // Added custom height
                    />
                  </div>

                  <div className="preview-stats-container">
                    <div className="preview-stat">
                      <FaBook className="stat-icon" />
                      <div className="preview-stat-content">
                        <div className="stat-value">{lessons.length}</div>
                        <div className="stat-label">Lessons</div>
                      </div>
                    </div>

                    <div className="preview-stat">
                      <FaDollarSign className="stat-icon" />
                      <div className="preview-stat-content">
                        <div className="stat-value">
                          {isFree ? "$0" : `$${price}`}
                        </div>
                        <div className="stat-label">Price</div>
                      </div>
                    </div>
                  </div>

                  <div className="preview-description">
                    <textarea
                      placeholder="Course description ..."
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Ready to Publish Section */}
              <div className="course-details-card publish-ready-card">
                <h3 className="publish-ready-title">Ready to Publish?</h3>

                <div className="publish-requirements-list">
                  <div
                    className={`requirement-item ${courseTitle && courseDescription ? "completed" : "incomplete"}`}
                  >
                    {courseTitle && courseDescription ? (
                      <FaCheckCircle className="requirement-icon completed-icon" />
                    ) : (
                      <FaTimes className="requirement-icon" />
                    )}
                    <span className="requirement-text">
                      Course title and description
                    </span>
                    <span
                      className={`required-badge ${courseTitle && courseDescription ? "completed-badge" : ""}`}
                    >
                      {courseTitle && courseDescription
                        ? "Completed"
                        : "Required"}
                    </span>
                  </div>

                  <div
                    className={`requirement-item ${department ? "completed" : "incomplete"}`}
                  >
                    {department ? (
                      <FaCheckCircle className="requirement-icon completed-icon" />
                    ) : (
                      <FaTimes className="requirement-icon" />
                    )}
                    <span className="requirement-text">Course department</span>
                    <span
                      className={`required-badge ${department ? "completed-badge" : ""}`}
                    >
                      {department ? "Completed" : "Required"}
                    </span>
                  </div>

                  <div
                    className={`requirement-item ${lessons.length > 0 ? "completed" : "incomplete"}`}
                  >
                    {lessons.length > 0 ? (
                      <FaCheckCircle className="requirement-icon completed-icon" />
                    ) : (
                      <FaTimes className="requirement-icon" />
                    )}
                    <span className="requirement-text">
                      At least one lesson
                    </span>
                    <span
                      className={`required-badge ${lessons.length > 0 ? "completed-badge" : ""}`}
                    >
                      {lessons.length > 0 ? "Completed" : "Required"}
                    </span>
                  </div>

                  <div
                    className={`requirement-item ${thumbnailFile ? "completed" : "incomplete"}`}
                  >
                    {thumbnailFile ? (
                      <FaCheckCircle className="requirement-icon completed-icon" />
                    ) : (
                      <FaTimes className="requirement-icon" />
                    )}
                    <span className="requirement-text">Course thumbnail</span>
                    <span
                      className={`required-badge ${thumbnailFile ? "completed-badge" : ""}`}
                    >
                      {thumbnailFile ? "Completed" : "Required"}
                    </span>
                  </div>

                  <div
                    className={`requirement-item ${isFree || (isFree === false && price > 0) ? "completed" : "incomplete"}`}
                  >
                    {isFree || (isFree === false && price > 0) ? (
                      <FaCheckCircle className="requirement-icon completed-icon" />
                    ) : (
                      <FaTimes className="requirement-icon" />
                    )}
                    <span className="requirement-text">
                      Pricing information
                    </span>
                    <span
                      className={`required-badge ${isFree || (isFree === false && price > 0) ? "completed-badge" : ""}`}
                    >
                      {isFree || (isFree === false && price > 0)
                        ? "Completed"
                        : "Required"}
                    </span>
                  </div>
                </div>

                {/* Only show alert if any requirements are incomplete */}
                {!courseTitle ||
                !courseDescription ||
                !department ||
                lessons.length === 0 ||
                !thumbnailFile ||
                (isFree === false && price <= 0) ? (
                  <div className="publish-alert">
                    <FiAlertCircle className="alert-icon" />
                    <div className="alert-content">
                      <p className="alert-text">
                        Please complete all required fields before publishing.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="publish-alert completed">
                    <FaCheckCircle className="alert-icon completed" />
                    <div className="alert-content">
                      <p className="alert-text">
                        Your course is ready to publish!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="course-creation-footer">
            <button
              type="button"
              className="nav-btn previous-btn"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button
              type="button"
              className="nav-btn save-draft-btn reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className={`nav-btn continue-btn ${
                currentStep === 3 &&
                (!courseTitle ||
                  !courseDescription ||
                  !department ||
                  lessons.length === 0 ||
                  !thumbnailFile ||
                  (!isFree && !(isFree === false && price > 0)))
                  ? "disabled-btn"
                  : ""
              }`}
              onClick={currentStep === 3 ? handlePublish : handleContinue}
              disabled={
                currentStep === 3 &&
                (!courseTitle ||
                  !courseDescription ||
                  !department ||
                  lessons.length === 0 ||
                  !thumbnailFile ||
                  (!isFree && !(isFree === false && price > 0)))
              }
            >
              {currentStep === 3 ? "Publish Course" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationPage;
