import React from 'react';
import './forStudentsPage.css';
import { FaStar, FaCheck, FaClock, FaChartLine, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoMdTime } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBrain } from 'react-icons/bi';
import { IoBook, IoSchool, IoChatbubble, IoPeople } from 'react-icons/io5';

const ForStudentsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="for-students-container">
      {/* Promo Section */}
      <div className="promo-section">
        <div className="text-column">
          <div className="student-badge">FOR STUDENTS</div>
          <h1 className="main-heading">
            Study Smarter, <span className="highlight">Not Harder</span>
          </h1>
          <p className="subheading">
            Discover how <span className="highlight">Beyond the Blackboard's AI-powered tools</span> can help you optimize your
            study time, improve comprehension, and achieve better results.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={() => navigate('/signup')}>Start Free Trial</button>
            <button className="cta-button secondary">
              Watch Demo <span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="image-column">
          <div className="laptop-container">
            <div className="rating-badge">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800" 
              alt="Coding interface on laptop" 
              className="laptop-image" 
            />
            <div className="stat-badge">
              <div className="check-icon-container">
                <FaCheck className="check-icon" />
              </div>
              <div className="stat-text">
                Study time reduced by 40%
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="fs-benefits-section">
        <div className="why-choose-badge">WHY CHOOSE US</div>
        <h2 className="benefits-heading">Benefits for Students</h2>
        <p className="benefits-subtext">
          Our platform provides unique advantages that traditional study methods can't match. <br /> Here's
          how Beyond the Blackboard helps you excel.
        </p>

        <div className="benefits-cards">
          {/* Card 1 */}
          <div className="benefit-card">
            <div className="icon-container">
              <IoMdTime className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Study Less, Learn More</h3>
            <p className="benefit-description">
              Our AI identifies your knowledge gaps and creates study plans focused only on what you need to learn.
            </p>
            <ul className="benefit-list">
              <li className="benefit-item">
                <FaCheck className="check-icon" /> 40% reduction in study time
              </li>
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Eliminate redundant review
              </li>
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Focus on challenging concepts
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="benefit-card">
            <div className="icon-container">
              <AiOutlineUser className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Personalized to Your Learning Style</h3>
            <p className="benefit-description">
              Everyone learns differently. Our AI adapts to your unique learning style and preferences.
            </p>
            <ul className="benefit-list">
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Visual, auditory, or reading-based
              </li>
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Adaptive pacing
              </li>
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Content format matched to your style
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="benefit-card">
            <div className="icon-container">
              <BiBrain className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Better Academic Results</h3>
            <p className="benefit-description">
              Students using Beyond the Blackboard see significant improvements in their grades and comprehension.
            </p>
            <ul className="benefit-list">
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Average 18% grade increase
              </li>
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Enhanced long-term retention
              </li>
              <li className="benefit-item">
                <FaCheck className="check-icon" /> Improved test performance
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Powerful Features Section */}
      <div className="features-section">
        <div className="features-badge">POWERFUL TOOLS</div>
        <h2 className="features-heading">Powerful Features for Students</h2>
        <p className="features-subtext">
          Explore the cutting-edge tools that make EduCraft the smartest way to learn and study.
        </p>

        <div className="features-grid">
          {/* Feature Card 1 */}
          <div className="for-student-feature-card">
            <div className="feature-header">
              <div className="sf-feature-icon-container">
                <IoBook className="sf-feature-icon" />
              </div>
              <h3 className="feature-title">AI Study Guide Generator</h3>
            </div>
            <p className="feature-description">
              Upload your lecture notes or syllabus, and our AI will generate comprehensive study guides tailored to your course material and learning objectives.
            </p>
            <ul className="feature-list">
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Converts dense material into easy-to-understand concepts
              </li>
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Creates practice questions focused on important topics
              </li>
            </ul>
          </div>

          {/* Feature Card 2 */}
          <div className="for-student-feature-card">
            <div className="feature-header">
              <div className="sf-feature-icon-container">
                <IoSchool className="sf-feature-icon" />
              </div>
              <h3 className="feature-title">Smart Knowledge Assessment</h3>
            </div>
            <p className="feature-description">
              Our AI evaluates your current knowledge level through adaptive questioning and creates a personalized study path.
            </p>
            <ul className="feature-list">
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Identifies specific knowledge gaps
              </li>
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Adapts difficulty based on your responses
              </li>
            </ul>
          </div>

          {/* Feature Card 3 */}
          <div className="for-student-feature-card">
            <div className="feature-header">
              <div className="sf-feature-icon-container">
                <IoChatbubble className="sf-feature-icon" />
              </div>
              <h3 className="feature-title">Study Companion AI</h3>
            </div>
            <p className="feature-description">
              A 24/7 AI tutor that answers questions, explains complex topics, and helps you work through problems in real-time.
            </p>
            <ul className="feature-list">
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Subject-matter expertise across all disciplines
              </li>
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Explains concepts in multiple ways until you understand
              </li>
            </ul>
          </div>

          {/* Feature Card 4 */}
          <div className="for-student-feature-card">
            <div className="feature-header">
              <div className="sf-feature-icon-container">
                <IoPeople className="sf-feature-icon" />
              </div>
              <h3 className="feature-title">Collaborative Study Spaces</h3>
            </div>
            <p className="feature-description">
              Virtual study rooms where you can collaborate with peers, share resources, and learn together with AI assistance.
            </p>
            <ul className="feature-list">
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> Real-time document collaboration
              </li>
              <li className="sf-feature-item">
                <FaCheck className="feature-check-icon" /> AI moderator to keep study sessions productive
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <div className="impact-label">REAL RESULTS</div>
        <h2 className="impact-heading">The Beyond the Blackboard Impact</h2>
        <p className="impact-subheading">
          Real results from students who transformed their learning experience with our platform.
        </p>

        <div className="impact-stats">
          {/* Stat Card 1 */}
          <div className="impact-stat-card">
            <div className="stat-icon-container">
              <FaClock className="stat-icon" />
            </div>
            <div className="stat-value">40%</div>
            <div className="stat-label">Average study time reduction</div>
          </div>

          {/* Stat Card 2 */}
          <div className="impact-stat-card">
            <div className="stat-icon-container">
              <FaChartLine className="stat-icon" />
            </div>
            <div className="stat-value">18%</div>
            <div className="stat-label">Average grade improvement</div>
          </div>

          {/* Stat Card 3 */}
          <div className="impact-stat-card">
            <div className="stat-icon-container">
              <FaUsers className="stat-icon" />
            </div>
            <div className="stat-value">92%</div>
            <div className="stat-label">Student retention rate</div>
          </div>

          {/* Stat Card 4 */}
          <div className="impact-stat-card">
            <div className="stat-icon-container">
              <FaGraduationCap className="stat-icon" />
            </div>
            <div className="stat-value">3.5M+</div>
            <div className="stat-label">Study hours optimized</div>
          </div>
        </div>

        <div className="impact-details">
          <div className="impact-progress-section">
            <div className="progress-section-heading">
              <div className="vertical-accent"></div>
              <h3>From Struggling to Succeeding</h3>
            </div>
            <p className="progress-description">
              Our platform helps students improve their academic performance while reducing stress.
              The personalized approach targets specific knowledge gaps and optimizes study strategies.
            </p>

            <div className="progress-bars">
              {/* Progress Bar 1 */}
              <div className="progress-item">
                <div className="progress-item-header">
                  <div className="progress-item-label">STEM Subject Mastery</div>
                  <div className="progress-item-values">
                    <span className="start-value">62%</span>
                    <span className="arrow-indicator">→</span>
                    <span className="end-value">85%</span>
                    <span className="change-badge positive">+23%</span>
                  </div>
                </div>
                <div className="for-student-progress-bar-container">
                  <div className="progress-bar-bg"></div>
                  <div 
                    className="progress-bar-fill purple" 
                    style={{ width: '85%' }}
                  ></div>
                  <div className="progress-marker" style={{ left: '62%' }}></div>
                </div>
              </div>

              {/* Progress Bar 2 */}
              <div className="progress-item">
                <div className="progress-item-header">
                  <div className="progress-item-label">Humanities Comprehension</div>
                  <div className="progress-item-values">
                    <span className="start-value">58%</span>
                    <span className="arrow-indicator">→</span>
                    <span className="end-value">78%</span>
                    <span className="change-badge positive">+20%</span>
                  </div>
                </div>
                <div className="for-student-progress-bar-container">
                  <div className="progress-bar-bg"></div>
                  <div 
                    className="progress-bar-fill purple" 
                    style={{ width: '78%' }}
                  ></div>
                  <div className="progress-marker" style={{ left: '58%' }}></div>
                </div>
              </div>

              {/* Progress Bar 3 */}
              <div className="progress-item">
                <div className="progress-item-header">
                  <div className="progress-item-label">Exam Prep Time</div>
                  <div className="progress-item-values">
                    <span className="start-value">12 hrs</span>
                    <span className="arrow-indicator">→</span>
                    <span className="end-value">7.2 hrs</span>
                    <span className="change-badge reduction">-40%</span>
                  </div>
                </div>
                <div className="for-student-progress-bar-container">
                  <div className="progress-bar-bg"></div>
                  <div 
                    className="progress-bar-fill green" 
                    style={{ width: '60%' }}
                  ></div>
                  <div className="progress-marker" style={{ left: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="impact-image-container">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
              alt="Student success desk setup" 
              className="impact-image" 
            />
            <div className="image-overlay">
              <h3>Success Stories</h3>
              <p>Join thousands of students who have transformed their academic journey with EduCraft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2 className="testimonials-heading">What Our Students Are Saying</h2>
        <p className="testimonials-subheading">
          Thousands of students have transformed their learning experience with Beyond the
          Blackboard. Here's what some of them have to say.
        </p>

        <div className="testimonials-container">
          {/* Testimonial Card 1 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-quote">
              "Beyond the Blackboard changed my approach to learning programming. 
              The AI tools helped me grasp complex concepts much faster than traditional methods."
            </p>
            <div className="testimonial-profile">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Emma Rodriguez" 
                className="testimonial-avatar" 
              />
              <div className="testimonial-info">
                <div className="testimonial-name">Emma Rodriguez</div>
                <div className="testimonial-role">Computer Science Student</div>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-quote">
              "The quality of courses and instructors is exceptional. I especially love the 
              personalized recommendations that helped me discover courses I wouldn't have found otherwise."
            </p>
            <div className="testimonial-profile">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="David Chen" 
                className="testimonial-avatar" 
              />
              <div className="testimonial-info">
                <div className="testimonial-name">David Chen</div>
                <div className="testimonial-role">Business Administration Major</div>
              </div>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-quote">
              "As a medical student, time is precious. The flashcard generator and notes 
              summarizer have saved me countless hours of study time while improving my retention."
            </p>
            <div className="testimonial-profile">
              <img 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="Sophia Williams" 
                className="testimonial-avatar" 
              />
              <div className="testimonial-info">
                <div className="testimonial-name">Sophia Williams</div>
                <div className="testimonial-role">Medical Student</div>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-cta">
          <p className="testimonials-count">Join over 100,000 satisfied students</p>
          <button className="join-button">Join Our Community</button>
        </div>

        <div className="support-icon">
          <FaCheck />
        </div>
      </div>
    </div>
  );
};

export default ForStudentsPage;