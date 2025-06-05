import React, { useState, useEffect } from 'react';
import './CourseCreationPage.css';
import { LuSparkles } from "react-icons/lu";
import { FaBook, FaVideo, FaDollarSign, FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaBullseye, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { BsPlayFill } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { coursesData } from '../../data/coursesData';

// Storage key for course creation data
const COURSE_CREATION_STORAGE_KEY = 'course_creation_data';

const CourseCreationPage = () => {
  // State for tracking current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // Extract unique categories from coursesData
  const courseCategories = [...new Set(coursesData.map(course => course.field))];
  
  // State for prerequisites and learning objectives
  const [prerequisites, setPrerequisites] = useState(['']);
  const [learningObjectives, setLearningObjectives] = useState(['']);
  
  // State for course preview and pricing
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0);
  
  // State for curriculum sections
  const [curriculumSections, setCurriculumSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  
  // State for form fields in step 1
  const [courseSubtitle, setCourseSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  
  // State for file uploads
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileName, setVideoFileName] = useState('');
  const [videoPreview, setVideoPreview] = useState(null);
  
  // State for notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem(COURSE_CREATION_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Restore all state from localStorage
      setCurrentStep(parsedData.currentStep || 1);
      setPrerequisites(parsedData.prerequisites || ['']);
      setLearningObjectives(parsedData.learningObjectives || ['']);
      setCourseTitle(parsedData.courseTitle || '');
      setCourseDescription(parsedData.courseDescription || '');
      setIsFree(parsedData.isFree !== undefined ? parsedData.isFree : true);
      setPrice(parsedData.price || 0);
      setCourseSubtitle(parsedData.courseSubtitle || '');
      setCategory(parsedData.category || '');
      setLanguage(parsedData.language || '');
      
      // Restore curriculum sections if available
      if (parsedData.curriculumSections) {
        setCurriculumSections(parsedData.curriculumSections);
        setExpandedSections(parsedData.expandedSections || []);
      }
      
      // Restore thumbnail preview if available
      if (parsedData.thumbnailPreview) {
        setThumbnailPreview(parsedData.thumbnailPreview);
      }
      
      // Restore video file name and preview if available
      if (parsedData.videoFileName) {
        setVideoFileName(parsedData.videoFileName);
      }
      
      if (parsedData.videoPreview) {
        setVideoPreview(parsedData.videoPreview);
      }
    }
  }, []);
  
  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToStore = {
      currentStep,
      prerequisites,
      learningObjectives,
      courseTitle,
      courseDescription,
      isFree,
      price,
      courseSubtitle,
      category,
      language,
      thumbnailPreview,
      videoFileName,
      videoPreview,
      curriculumSections,
      expandedSections
    };
    
    localStorage.setItem(COURSE_CREATION_STORAGE_KEY, JSON.stringify(dataToStore));
  }, [currentStep, prerequisites, learningObjectives, courseTitle, courseDescription, isFree, price, courseSubtitle, category, language, thumbnailPreview, videoFileName, videoPreview, curriculumSections, expandedSections]);
  
  // Calculate progress percentage based on current step
  const progressPercentage = (currentStep / 3) * 100;

  // Update the completion-fill style
  const completionFillStyle = {
    width: `${progressPercentage}%`,
  };

  // Handle prerequisite input change
  const handlePrerequisiteChange = (index, value) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = value;
    setPrerequisites(updatedPrerequisites);
  };
  
  // Handle learning objective input change
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...learningObjectives];
    updatedObjectives[index] = value;
    setLearningObjectives(updatedObjectives);
  };
  
  // Add new prerequisite field
  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, '']);
  };
  
  // Add new learning objective field
  const addLearningObjective = () => {
    setLearningObjectives([...learningObjectives, '']);
  };
  
  // Remove prerequisite field
  const removePrerequisite = (index) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites.splice(index, 1);
    setPrerequisites(updatedPrerequisites);
  };
  
  // Remove learning objective field
  const removeLearningObjective = (index) => {
    const updatedObjectives = [...learningObjectives];
    updatedObjectives.splice(index, 1);
    setLearningObjectives(updatedObjectives);
  };

  // Handle continue button click
 const handleContinue = () => {
  if (currentStep < 3) {
    setCurrentStep(currentStep + 1);
+   window.scrollTo(0, 0);
  }
};

  // Handle previous button click
// Handle previous button click
const handlePrevious = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
+   window.scrollTo(0, 0);
  }
};
  
  // Handle publish button click
  const handlePublish = () => {
    // You can add your publishing logic here
    setNotificationMessage('Course published successfully!');
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // Handle reset button click - clears all form fields and uploaded media
  const handleReset = () => {
    // Animate the reset buttons before performing the actual reset
    animateResetButtons();
    
    // Perform the actual reset after animation completes
    setTimeout(() => {
      // Reset all form fields to their initial state
      setPrerequisites(['']);
      setLearningObjectives(['']);
      setCourseTitle('');
      setCourseDescription('');
      setIsFree(true);
      setPrice(0);
      setCurriculumSections([]);
      setExpandedSections([]);
      setCourseSubtitle('');
      setCategory('');
      setLanguage('');
      
      // Reset file uploads
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setVideoFile(null);
      setVideoFileName('');
      setVideoPreview(null);
      
      // Reset to first step
      setCurrentStep(1);
      
      // Clear localStorage
      localStorage.removeItem(COURSE_CREATION_STORAGE_KEY);
      
      // Show notification message
      setNotificationMessage('All form fields have been reset!');
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }, 1000); // Wait for animation to complete
  };
  
  // CSS styles for reset button animation
  const resetButtonCss = `
    .reset-btn-animated .letter {
      display: inline-block;
      transition: opacity 0.1s ease;
    }
  `;

  // Function to create the reset animation
  const createResetAnimation = (buttonElement) => {
    const originalText = buttonElement.textContent || buttonElement.innerText;
    const letters = originalText.split('');
    let isAnimating = false;

    // Replace button text with individual letter spans
    function setupLetterSpans() {
      buttonElement.innerHTML = letters.map(letter =>
        `<span class="letter">${letter}</span>`
      ).join('');
    }

    // Scramble letters with random characters
    function scrambleLetters() {
      const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const letterSpans = buttonElement.querySelectorAll('.letter');
      const duration = 800;
      const steps = 20;
      const stepDuration = duration / steps;

      letterSpans.forEach((span, index) => {
        let step = 0;
        
        const scrambleInterval = setInterval(() => {
          if (step < steps - 4) {
            span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
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
      const letterSpans = buttonElement.querySelectorAll('.letter');
      
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
    buttonElement.classList.add('reset-btn-animated');

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
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
      const animateReset = createResetAnimation(resetBtn);
      animateReset();
    }
  };
  
  // Add a new curriculum section
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: '',
      description: '',
      lessons: []
    };
    
    const updatedSections = [...curriculumSections, newSection];
    setCurriculumSections(updatedSections);
    setExpandedSections([...expandedSections, newSection.id]);
  };
  
  // Toggle section expansion
  const toggleSectionExpansion = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };
  
  // Update section title
  const updateSectionTitle = (sectionId, title) => {
    const updatedSections = curriculumSections.map(section => {
      if (section.id === sectionId) {
        return { ...section, title };
      }
      return section;
    });
    setCurriculumSections(updatedSections);
  };
  
  // Update section description
  const updateSectionDescription = (sectionId, description) => {
    const updatedSections = curriculumSections.map(section => {
      if (section.id === sectionId) {
        return { ...section, description };
      }
      return section;
    });
    setCurriculumSections(updatedSections);
  };
  
  // Delete a section
  const deleteSection = (sectionId) => {
    const updatedSections = curriculumSections.filter(section => section.id !== sectionId);
    setCurriculumSections(updatedSections);
    setExpandedSections(expandedSections.filter(id => id !== sectionId));
  };
  
  // Add a new lesson to a section
  const addLesson = (sectionId) => {
    const newLesson = {
      id: Date.now(),
      title: '',
      description: ''
    };
    
    const updatedSections = curriculumSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [...section.lessons, newLesson]
        };
      }
      return section;
    });
    
    setCurriculumSections(updatedSections);
  };
  
  // Update lesson title
  const updateLessonTitle = (sectionId, lessonId, title) => {
    const updatedSections = curriculumSections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return { ...lesson, title };
          }
          return lesson;
        });
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setCurriculumSections(updatedSections);
  };
  
  // Update lesson description
  const updateLessonDescription = (sectionId, lessonId, description) => {
    const updatedSections = curriculumSections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return { ...lesson, description };
          }
          return lesson;
        });
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setCurriculumSections(updatedSections);
  };
  
  // Delete a lesson
  const deleteLesson = (sectionId, lessonId) => {
    const updatedSections = curriculumSections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.filter(lesson => lesson.id !== lessonId);
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setCurriculumSections(updatedSections);
  };
  
  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoFileName(file.name);
      
      // Create a preview data URL for the video
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
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
          <p className="intro-subtitle">Transform your expertise into engaging online courses with our streamlined creation process.</p>
          <p className="intro-tagline">Simple. Fast. Professional.</p>
          
          <div className="builder-card">
            <div className="card-top">
              <div className="top-left">
                <LuSparkles className="glitter-icon" />
                <h2>Create Your Course</h2>
              </div>
              <div className="phase-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#8B5CF6" strokeWidth="2" />
                </svg>
                <span>Step {currentStep} of 3</span>
              </div>
            </div>
            
            <div className="completion-bar">
              <div className="completion-fill" style={completionFillStyle}></div>
            </div>
            
            <div className="phases-container">
              <div className={`phase-column ${currentStep === 1 ? 'active' : ''}`}>
                <div className="phase-circle">
                  {currentStep > 1 ? <FaCheckCircle /> : "1"}
                </div>
                <p className="phase-title">Course Details</p>
                <p className="phase-subtitle">Basic information</p>
              </div>
              
              <div className={`phase-column ${currentStep === 2 ? 'active' : ''}`}>
                <div className="phase-circle">
                  {currentStep > 2 ? <FaCheckCircle /> : "2"}
                </div>
                <p className="phase-title">Content & Media</p>
                <p className="phase-subtitle">Curriculum & assets</p>
              </div>
              
              <div className={`phase-column ${currentStep === 3 ? 'active' : ''}`}>
                <div className="phase-circle">3</div>
                <p className="phase-title">Finalize</p>
                <p className="phase-subtitle">Pricing & publish</p>
              </div>
            </div>
          </div>
          
          {/* Step 1: Course Information Form Section */}
          {currentStep === 1 && (
            <>
              <div className="course-details-card">
                <div className="details-header">
                  <div className="icon-circle">
                    <FaBook className="text-icon" />
                  </div>
                  <h3>Course Information</h3>
                </div>
                
                <div className="details-form">
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
                  
                  <div className="input-group">
                    <label htmlFor="courseSubtitle">Course Subtitle</label>
                    <input 
                      type="text" 
                      id="courseSubtitle" 
                      placeholder="Brief, engaging description" 
                      value={courseSubtitle}
                      onChange={(e) => setCourseSubtitle(e.target.value)}
                    />
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
                  
                  <div className="input-row">
                    <div className="input-group dropdown">
                      <label htmlFor="category">
                        Category <span className="mandatory">*</span>
                      </label>
                      <div className="select-container">
                        <select 
                          id="category" 
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled>Choose category</option>
                          {courseCategories.map((category, index) => (
                            <option key={index} value={category.toLowerCase().replace(/\s+/g, '-')}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <IoIosArrowDown className="arrow-icon" />
                      </div>
                    </div>
                    
                    <div className="input-group dropdown">
                      <label htmlFor="language">
                        Language <span className="mandatory">*</span>
                      </label>
                      <div className="select-container">
                        <select 
                          id="language" 
                          required
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option value="" disabled>Choose language</option>
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                          <option value="chinese">Chinese</option>
                          <option value="japanese">Japanese</option>
                          <option value="arabic">Arabic</option>
                        </select>
                        <IoIosArrowDown className="arrow-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Prerequisites Section */}
              <div className="course-details-card prerequisites-card">
                <div className="details-header">
                  <div className="icon-circle prerequisites-icon">
                    <FaCheckCircle className="text-icon" />
                  </div>
                  <h3>Prerequisites</h3>
                </div>
                
                <div className="details-form">
                  {prerequisites.map((prerequisite, index) => (
                    <div key={`prerequisite-${index}`} className="input-group prerequisite-input-group">
                      <div className="input-with-action">
                        <input
                          type="text"
                          value={prerequisite}
                          onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                          placeholder="e.g., Basic knowledge of HTML and CSS"
                        />
                        {prerequisites.length > 1 && (
                          <button 
                            type="button" 
                            className="clear-input-btn"
                            onClick={() => removePrerequisite(index)}
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="add-item-container">
                    <button type="button" className="add-item-btn" onClick={addPrerequisite}>
                      <FaPlus className="add-icon" />
                      <span>Add Prerequisite</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Learning Objectives Section */}
              <div className="course-details-card learning-objectives-card">
                <div className="details-header">
                  <div className="icon-circle learning-objectives-icon">
                    <FaBullseye className="text-icon" />
                  </div>
                  <h3>Learning Objectives</h3>
                </div>
                
                <div className="details-form">
                  {learningObjectives.map((objective, index) => (
                    <div key={`objective-${index}`} className="input-group objective-input-group">
                      <div className="input-with-action">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleObjectiveChange(index, e.target.value)}
                          placeholder="e.g., Build responsive websites from scratch"
                        />
                        {learningObjectives.length > 1 && (
                          <button 
                            type="button" 
                            className="clear-input-btn"
                            onClick={() => removeLearningObjective(index)}
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="add-item-container">
                    <button type="button" className="add-item-btn" onClick={addLearningObjective}>
                      <FaPlus className="add-icon" />
                      <span>Add Learning Objective</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
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
                      <div className="upload-area" style={thumbnailPreview ? {borderColor: '#15a72d', backgroundColor: 'rgba(139, 92, 246, 0.05)'} : {}}>
                        {thumbnailPreview ? (
                          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <img 
                              src={thumbnailPreview} 
                              alt="Thumbnail preview" 
                              style={{maxWidth: '100%', maxHeight: '120px', objectFit: 'contain', marginBottom: '10px'}} 
                            />
                            <p className="upload-text">Change Thumbnail</p>
                          </div>
                        ) : (
                          <>
                            <div className="upload-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    
                    {/* Promotional Video Upload */}
                    <div className="media-column">
                      <h4>Promotional Video</h4>
                      <div className="upload-area" style={videoFileName || videoPreview ? {borderColor: '#15a72d', backgroundColor: 'rgba(139, 92, 246, 0.05)'} : {}}>
                        {videoFileName || videoPreview ? (
                          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            {videoPreview && (
                              <video 
                                style={{maxWidth: '100%', maxHeight: '120px', objectFit: 'contain', marginBottom: '10px'}} 
                                controls
                              >
                                <source src={videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            <div className="upload-icon video-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                            <p className="upload-text">{videoFileName}</p>
                            <p className="upload-specs">Click to change video</p>
                          </div>
                        ) : (
                          <>
                            <div className="upload-icon video-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                            <p className="upload-text">Upload Preview Video</p>
                            <p className="upload-specs">2-15 minutes recommended</p>
                          </>
                        )}
                        <input 
                          type="file" 
                          id="courseVideo" 
                          accept="video/*" 
                          className="file-input"
                          onChange={handleVideoChange}
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
                  <p>Organize your content into sections and lessons</p>
                  
                  {/* Display curriculum sections */}
                  {curriculumSections.length > 0 && (
                    <div className="sections-container">
                      {curriculumSections.map((section, sectionIndex) => (
                        
                        <div key={section.id} className="section-card">
                         <div className="section-header" onClick={() => toggleSectionExpansion(section.id)} style={{ cursor: 'pointer' }}>
                              <div className="section-title-row">
                                <h4 className="section-heading">
                                  {section.title ? section.title : `Section ${sectionIndex + 1}`}
                                </h4>
                                <div className="section-actions">
                                  <button 
                                    type="button" 
                                    className="expand-btn"
                                  >
                                    {expandedSections.includes(section.id) ? <IoChevronUp /> : <IoChevronDown />}
                                  </button>
                                </div>
                              </div>
                              <div className="lesson-count">{section.lessons.length} lessons</div>

                              <button 
                                type="button" 
                                className="delete-btn"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering the section header click
                                  deleteSection(section.id);
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          

                          {expandedSections.includes(section.id) && (
                            <div className="section-content">
                              <div className="form-group">
                                <label htmlFor={`section-title-${section.id}`} className="form-label">Section Title</label>
                                <input
                                  type="text"
                                  id={`section-title-${section.id}`}
                                  className="form-input"
                                  placeholder="Enter section title"
                                  value={section.title}
                                  onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                />
                              </div>
                              
                              <div className="form-group">
                                <label htmlFor={`section-description-${section.id}`} className="form-label">Section Description</label>
                                <textarea
                                  id={`section-description-${section.id}`}
                                  className="form-textarea"
                                  placeholder="Describe this section"
                                  value={section.description}
                                  onChange={(e) => updateSectionDescription(section.id, e.target.value)}
                                ></textarea>
                              </div>
                              
                              <div className="lessons-list">
                                <h5 className="lessons-list-title">Lessons</h5>
                                
                                {section.lessons.length > 0 ? (
                                  section.lessons.map((lesson, lessonIndex) => (
                                    <div key={lesson.id} className="lesson-item">
                                      <div className="lesson-content">
                                        <div className="lesson-header">
                                          <span className="lesson-number">Lesson {lessonIndex + 1}</span>
                                          <button 
                                            type="button" 
                                            className="delete-lesson-btn"
                                            onClick={() => deleteLesson(section.id, lesson.id)}
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
                                            onChange={(e) => updateLessonTitle(section.id, lesson.id, e.target.value)}
                                          />
                                        </div>
                                        
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                          <textarea
                                            className="form-textarea"
                                            placeholder="Lesson description"
                                            value={lesson.description}
                                            onChange={(e) => updateLessonDescription(section.id, lesson.id, e.target.value)}
                                            rows="2"
                                          ></textarea>
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
                                  onClick={() => addLesson(section.id)}
                                >
                                  <FaPlus />
                                  Add Lesson
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button className="add-section-btn" onClick={(e) => {
                    e.preventDefault();
                    addSection();
                  }}>
                    <FaPlus className="add-icon" />
                    Add Section
                  </button>
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
                          value={price || ''}
                          onChange={(e) => {
                            const newPrice = e.target.value === '' ? 0 : Number(e.target.value);
                            if (newPrice > 5000) {
                              setPrice(5000);
                              // Add error message element
                              const priceInput = document.getElementById('coursePrice');
                              const errorMsg = document.createElement('div');
                              errorMsg.className = 'error-message';
                              errorMsg.textContent = 'Maximum price allowed is $5000';
                              errorMsg.style.color = 'red';
                              errorMsg.style.fontSize = '0.8rem';
                              errorMsg.style.marginTop = '4px';
                              
                              // Insert error message after input
                              priceInput.parentNode.insertBefore(errorMsg, priceInput.nextSibling);
                              
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
                    
                    <div className="input-group currency-input">
                      <label htmlFor="courseCurrency">Currency</label>
                      <div className="select-container">
                        <select id="courseCurrency" >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD (C$)</option>
                          <option value="EGP">EGP (L.E)</option>

                        </select>
                        <IoIosArrowDown className="arrow-icon" />
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
                    <label htmlFor="previewTitle" style={{fontSize: '1.25rem'}}>Course Title</label>
                    <input 
                      type="text" 
                      id="previewTitle" 
                      placeholder="Course subtitle" 
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      style={{height: '60px'}} // Added custom height
                    />
                  </div>
                  
                  <div className="preview-stats-container">
                    <div className="preview-stat">
                      <FaBook className="stat-icon" />
                      <div className="preview-stat-content">
                        <div className="stat-value">0</div>
                        <div className="stat-label">Lessons</div>
                      </div>
                    </div>
                    
                    <div className="preview-stat">
                      <FaDollarSign className="stat-icon" />
                      <div className="preview-stat-content">
                        <div className="stat-value">{isFree ? "$0" : `$${price}`}</div>
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
                  <div className={`requirement-item ${courseTitle && courseDescription ? 'completed' : 'incomplete'}`}>
                    {courseTitle && courseDescription ? 
                      <FaCheckCircle className="requirement-icon completed-icon" /> : 
                      <FaTimes className="requirement-icon" />
                    }
                    <span className="requirement-text">Course title and description</span>
                    <span className={`required-badge ${courseTitle && courseDescription ? 'completed-badge' : ''}`}>
                      {courseTitle && courseDescription ? 'Completed' : 'Required'}
                    </span>
                  </div>
                  
                  <div className={`requirement-item ${category && language ? 'completed' : 'incomplete'}`}>
                    {category && language ? 
                      <FaCheckCircle className="requirement-icon completed-icon" /> : 
                      <FaTimes className="requirement-icon" />
                    }
                    <span className="requirement-text">Course category and level</span>
                    <span className={`required-badge ${category && language ? 'completed-badge' : ''}`}>
                      {category && language ? 'Completed' : 'Required'}
                    </span>
                  </div>
                  
                  <div className={`requirement-item ${curriculumSections.length > 0 ? 'completed' : 'incomplete'}`}>
                    {curriculumSections.length > 0 ? 
                      <FaCheckCircle className="requirement-icon completed-icon" /> : 
                      <FaTimes className="requirement-icon" />
                    }
                    <span className="requirement-text">At least one curriculum section</span>
                    <span className={`required-badge ${curriculumSections.length > 0 ? 'completed-badge' : ''}`}>
                      {curriculumSections.length > 0 ? 'Completed' : 'Required'}
                    </span>
                  </div>
                  
                  <div className={`requirement-item ${thumbnailPreview ? 'completed' : 'incomplete'}`}>
                    {thumbnailPreview ? 
                      <FaCheckCircle className="requirement-icon completed-icon" /> : 
                      <FaTimes className="requirement-icon" />
                    }
                    <span className="requirement-text">Course thumbnail</span>
                    <span className={`required-badge ${thumbnailPreview ? 'completed-badge' : ''}`}>
                      {thumbnailPreview ? 'Completed' : 'Required'}
                    </span>
                  </div>
                  
                  <div className={`requirement-item ${!isFree || (isFree === false && price > 0) ? 'completed' : 'incomplete'}`}>
                    {!isFree || (isFree === false && price > 0) ? 
                      <FaCheckCircle className="requirement-icon completed-icon" /> : 
                      <FaTimes className="requirement-icon" />
                    }
                    <span className="requirement-text">Pricing information</span>
                    <span className={`required-badge ${!isFree || (isFree === false && price > 0) ? 'completed-badge' : ''}`}>
                      {!isFree || (isFree === false && price > 0) ? 'Completed' : 'Required'}
                    </span>
                  </div>
                </div>
                        
                  
               
                
                {/* Only show alert if any requirements are incomplete */}
              {(!courseTitle || !courseDescription || !category || !language || curriculumSections.length === 0 || !thumbnailPreview || (isFree === false && price <= 0)) ? (
                <div className="publish-alert">
                  <FaTimes className="alert-icon" />
                  <div className="alert-content">
                    <h4 className="alert-title">Complete required items</h4>
                    <p className="alert-message">Please complete all required items above before publishing your course.</p>
                  </div>
                </div>
              ) : (
                <div className="publish-alert completed">
                  <FaCheckCircle className="alert-icon completed" />
                  <div className="alert-content">
                    <h4 className="alert-title completed">All requirements completed</h4>
                    <p className="alert-message completed">Your course is ready to be published!</p>
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
            <button type="button" className="nav-btn save-draft-btn reset-btn" onClick={handleReset}>Reset</button>
            <button 
                type="button" 
                className={`nav-btn continue-btn ${(currentStep === 3 && (!courseTitle || !courseDescription || !category || !language || curriculumSections.length === 0 || !thumbnailPreview || (isFree === false && price <= 0))) ? 'disabled-btn' : ''}`}
                onClick={handleContinue}
                disabled={(currentStep === 3 && (!courseTitle || !courseDescription || !category || !language || curriculumSections.length === 0 || !thumbnailPreview || (isFree === false && price <= 0)))}
              >
              {currentStep === 3 ? 'Publish Course' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationPage;