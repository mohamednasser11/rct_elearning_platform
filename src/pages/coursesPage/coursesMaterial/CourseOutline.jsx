import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './CourseOutline.css';

const CourseOutline = ({ course }) => {
  const [expandedSections, setExpandedSections] = useState({
    0: true, // Section 1 (Introduction) expanded by default
    1: false, // Section 2 (Core Concepts) collapsed by default
    2: false, // Section 3 collapsed by default
    3: false, // Section 4 collapsed by default
    4: false  // Section 5 collapsed by default
  });

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  // Mock data for course curriculum
  const courseData = {
    title: "Course Curriculum",
    completion: 8, // 8% completed
    totalLessons: 34,
    totalLength: "525 min",
    sections: [
      {
        id: 1,
        title: "Introduction",
        description: "Get started with the fundamental concepts and course overview",
        totalLessons: 3,
        completedLessons: 1,
        totalMinutes: 45,
        completionPercentage: 33,
        lessons: [
          {
            id: 101,
            title: "Course Overview",
            duration: "10 min",
            isCompleted: true,
            isPreview: true,
            isLocked: false,
          },
          {
            id: 102,
            title: "Getting Started",
            duration: "15 min",
            isCompleted: false,
            isPreview: true,
            isLocked: false,
          },
          {
            id: 103,
            title: "Setting Up Your Environment",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          }
        ]
      },
      {
        id: 2,
        title: "Core Concepts",
        description: "Master the essential principles and terminology",
        totalLessons: 8,
        completedLessons: 0,
        totalMinutes: 160,
        completionPercentage: 0,
        lessons: [
          {
            id: 201,
            title: "Fundamental Principles",
            duration: "25 min",
            isCompleted: false,
            isPreview: true,
            isLocked: false,
          },
          {
            id: 202,
            title: "Key Terminology",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 203,
            title: "Practical Examples",
            duration: "30 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 204,
            title: "Common Patterns",
            duration: "25 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 205,
            title: "Data Management Fundamentals",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 206,
            title: "Architecture Overview",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 207,
            title: "Component Design Patterns",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 208,
            title: "Core Concepts Quiz",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          }
        ]
      },
      {
        id: 3,
        title: "Advanced Techniques",
        description: "Explore advanced methods and specialized approaches",
        totalLessons: 10,
        completedLessons: 0,
        totalMinutes: 150,
        completionPercentage: 0,
        lessons: [
          {
            id: 301,
            title: "Performance Optimization",
            duration: "30 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 302,
            title: "Working with Complex Data",
            duration: "25 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 303,
            title: "Error Handling Strategies",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 304,
            title: "Integration with External Systems",
            duration: "25 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 305,
            title: "Scaling Your Solution",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 306,
            title: "Advanced State Management",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 307,
            title: "Security Best Practices",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 308,
            title: "Modern Tooling Integration",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 309,
            title: "Advanced Techniques Workshop",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 310,
            title: "Advanced Techniques Assessment",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          }
        ]
      },
      {
        id: 4,
        title: "Practical Applications",
        description: "Apply your knowledge in real-world scenarios",
        totalLessons: 8,
        completedLessons: 0,
        totalMinutes: 115,
        completionPercentage: 0,
        lessons: [
          {
            id: 401,
            title: "Case Study: Project Setup",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 402,
            title: "Building the Core Functionality",
            duration: "30 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 403,
            title: "Testing and Validation",
            duration: "25 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 404,
            title: "Deployment and Monitoring",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 405,
            title: "Industry Case Study 1",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 406,
            title: "Industry Case Study 2",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 407,
            title: "Hands-on Project Workshop",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 408,
            title: "Project Review Session",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          }
        ]
      },
      {
        id: 5,
        title: "Next Steps and Resources",
        description: "Continue your learning journey with additional resources",
        totalLessons: 5,
        completedLessons: 0,
        totalMinutes: 55,
        completionPercentage: 0,
        lessons: [
          {
            id: 501,
            title: "Continued Learning Paths",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 502,
            title: "Community Resources and Support",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 503,
            title: "Final Project Guidelines",
            duration: "20 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 504,
            title: "Career Development Opportunities",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          },
          {
            id: 505,
            title: "Course Completion Assessment",
            duration: "15 min",
            isCompleted: false,
            isPreview: false,
            isLocked: true,
          }
        ]
      }
    ]
  };

  return (
    <div className="curriculum-container">
      <div className="curriculum-header">
        <div className="curriculum-title-section">
          <h2>{courseData.title}</h2>
          <p>{courseData.totalLessons} lessons • {courseData.totalLength} total length</p>
        </div>
        <div className="curriculum-progress-section">
          <div className="completion-info">
            <span className="completion-percentage">{courseData.completion}%</span>
            <div className="progress-bar-container">
              <div 
                className="progress-barC" 
                style={{ width: `${courseData.completion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="curriculum-sections">
        {courseData.sections.map((section, index) => (
          <div key={section.id} className="curriculum-section">
            <div className={`section-header ${expandedSections[index] ? 'expanded' : ''}`}>
              <div className="section-number">{section.id}</div>
              <div className="section-details">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <div className="section-info">
                <div className="section-metadata">
                  <span>{section.totalLessons} lessons</span>
                  <span className="section-minutes">{section.totalMinutes} minutes</span>
                </div>
                <div 
                  className="section-toggle" 
                  onClick={() => toggleSection(index)}
                >
                  {expandedSections[index] ? <FaChevronDown /> : <FaChevronUp />}
                </div>
              </div>
            </div>

            {expandedSections[index] && (
              <div className="section-content">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-item">
                    <div className="lesson-checkbox">
                      {lesson.isCompleted ? (
                        <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                          <path d="M4 8l-2-2 1-1 1 1 3-3 1 1z" />
                        </svg>
                      ) : null}
                    </div>
                    <div className="lesson-details">
                      <div className="lesson-title-row">
                        <span className="lesson-title">{lesson.title}</span>
                        {lesson.isPreview && (
                          <button className="preview-button">Preview</button>
                        )}
                      </div>
                      <div className="lesson-duration">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
                        </svg>
                        {lesson.duration}
                      </div>
                    </div>
                    {lesson.isLocked && (
                      <div className="lock-iconz">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                          <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                <div className="section-footer">
                  <div className="section-progress">
                    <div className="section-progress-text">
                      {section.completionPercentage}% complete
                    </div>
                    <div className="section-progress-bar-container">
                      <div 
                        className="section-progress-bar" 
                        style={{ width: `${section.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  {section.completionPercentage === 0 && (
                    <button className="start-section-button">Start Section</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOutline;
