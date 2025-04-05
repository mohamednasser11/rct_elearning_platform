import React from 'react';
import { FaPlay, FaCheck, FaLock } from 'react-icons/fa';
import './CourseOutline.css';

const CourseOutline = ({ course, currentLesson, onSelectLesson }) => {
  // Count total lessons across all sections
  const totalLessons = course.curriculum?.reduce((total, section) => total + section.lessons.length, 0) || 0;
  
  // Calculate total duration in minutes
  const totalDuration = course.curriculum?.reduce((total, section) => {
    const sectionDuration = section.lessons.reduce((mins, lesson) => {
      const [minutes] = lesson.duration.split(':').map(Number);
      return mins + (minutes || 0);
    }, 0);
    return total + sectionDuration;
  }, 0) || 0;

  return (
    <div className="course-outline-container">
      <div className="outline-header">
        <h2>Course Outline</h2>
        <div className="course-stats">
          <div className="stat-item">
            <span className="stat-value">{totalLessons}</span>
            <span className="stat-label">Lessons</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalDuration}</span>
            <span className="stat-label">Minutes</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{course.curriculum?.length || 0}</span>
            <span className="stat-label">Sections</span>
          </div>
        </div>
      </div>

      <div className="course-structure">
        {course.curriculum?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="outline-section">
            <div className="section-header">
              <div className="section-number">{sectionIndex + 1}</div>
              <h3>{section.title}</h3>
              <div className="section-info">
                <span>{section.lessons.length} lessons</span>
                <span>•</span>
                <span>{section.duration}</span>
              </div>
            </div>

            <div className="section-lessons">
              {section.lessons.map((lesson, lessonIndex) => {
                const isCurrentLesson = currentLesson?.id === lesson.id;
                const isCompleted = lesson.completed;
                const isLocked = lesson.locked;

                return (
                  <div 
                    key={lessonIndex} 
                    className={`outline-lesson ${isCurrentLesson ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={() => !isLocked && onSelectLesson(lesson)}
                  >
                    <div className="lesson-icon">
                      {isCompleted ? (
                        <FaCheck />
                      ) : isLocked ? (
                        <FaLock />
                      ) : (
                        <FaPlay />
                      )}
                    </div>
                    <div className="lesson-details">
                      <span className="lesson-title">{lesson.title}</span>
                      <div className="lesson-meta">
                        <span className="lesson-type">{lesson.type || 'Video'}</span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </div>
                    </div>
                    {lesson.preview && <span className="preview-badge">Preview</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOutline;
