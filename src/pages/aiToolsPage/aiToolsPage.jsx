import React from 'react';
import './aiToolsPage.css';
import { FaLightbulb, FaCalculator, FaCalendarAlt, FaLanguage, FaGraduationCap, FaChalkboardTeacher, FaUserGraduate, FaStar, FaRobot, FaBook, FaChartLine, FaBrain, FaBolt, FaFileAlt } from 'react-icons/fa';
import { IoMdBook } from 'react-icons/io';
import { BrainCircuit } from 'lucide-react';

const AiToolsPage = () => {
  return (
    <div className="ai-tools-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Revolutionize<br />
            Learning with<br />
            <span className="highlight" style={{ whiteSpace: 'nowrap' }}>AI-Powered Education</span>
          </h1>
          <p className="hero-subtitle">Beyond the Blackboard helps students and educators unlock their full potential with intelligent AI tools that summarize lectures and generate customized assessments.</p>
          <div className="cta-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">View Demo</button>
          </div>
          <div className="hero-features">
            <span><BrainCircuit className="feature-icon" /> <span className="feature-text">AI-Powered</span></span>
            <span><FaFileAlt className="feature-icon" /> <span className="feature-text">Custom Summarise</span></span>
            <span><IoMdBook className="feature-icon" /> <span className="feature-text">Smart Assessments</span></span>
          </div>
        </div>
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-dot "></div>
              <div className="preview-dot "></div>
              <div className="preview-dot "></div>
            </div>
            <div className="preview-content">
              <h3 className="preview-title">Lecture Summarization</h3>
              <div className="preview-line"></div>
              <div className="preview-line short"></div>
              <div className="preview-line medium"></div>
              <div className="summary-options">
                <button className="summary-btn">Short</button>
                <button className="summary-btn">Medium</button>
                <button className="summary-btn">Long</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="ai-tools-section">
        <h2>AI-Powered <span className="highlight">Learning Tools</span></h2>
        <p className="section-subtitle">Our intelligent features help both students and educators maximize their potential</p>
        <p className="section-subtitle">through cutting-edge AI technology.</p>
        
        <div className="tools-grid">
          <div className="tools-column">
            <div className="tool-card">
              <div className="tool-icon-wrapper blue">
                <FaRobot className="tool-icon" />
              </div>
              <div className="tool-content">
                <h3>Lecture Summarizer</h3>
                <p>Convert long lectures into concise, easy-to-digest summaries</p>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon-wrapper purple">
                <FaBook className="tool-icon" />
              </div>
              <div className="tool-content">
                <h3>Study Material Generator</h3>
                <p>Create comprehensive study materials from any topic</p>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon-wrapper teal">
                <FaChartLine className="tool-icon" />
              </div>
              <div className="tool-content">
                <h3>Progress Analytics</h3>
                <p>Track your learning progress with detailed insights</p>
              </div>
            </div>
          </div>

          <div className="tools-column">
            <div className="tool-card">
              <div className="tool-icon-wrapper orange">
                <FaBook className="tool-icon" />
              </div>
              <div className="tool-content">
                <h3>Smart Tutor</h3>
                <p>Get personalized help and instant feedback 24/7</p>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon-wrapper green">
                <FaCalculator className="tool-icon" />
              </div>
              <div className="tool-content">
                <h3>Problem Solver</h3>
                <p>Step-by-step solutions for complex problems</p>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon-wrapper pink">
                <FaLanguage className="tool-icon" />
              </div>
              <div className="tool-content">
                <h3>Language Learning</h3>
                <p>Practice conversations with AI language partners</p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h4>AI-Powered Support</h4>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h4>Smart Analytics</h4>
          </div>
          <div className="feature-card">
            <FaBrain className="feature-icon" />
            <h4>Deep Learning</h4>
          </div>
          <div className="feature-card">
            <FaLanguage className="feature-icon" />
            <h4>Language Skills</h4>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="user-section students-section">
        <div className="section-content">
          <h2><FaUserGraduate className="section-icon" /> For Students</h2>
          <p className="section-description">Get access to AI-powered study materials and personalized learning paths.</p>
          <div className="login-form">
            <input type="email" placeholder="Enter your email" className="form-input" />
            <input type="password" placeholder="Enter your password" className="form-input" />
            <button className="primary-btn">Try Student Tools</button>
            <p className="form-text">Access AI-powered study materials, practice tests, and personalized learning paths.</p>
          </div>
        </div>
        <div className="section-preview">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
            </div>
            <div className="preview-content">
              <div className="preview-line"></div>
              <div className="preview-line short"></div>
              <div className="preview-line medium"></div>
            </div>
          </div>
        </div>
      </section>

      {/* For Educators Section */}
      <section className="user-section educators-section">
        <div className="section-content">
          <h2><FaChalkboardTeacher className="section-icon" /> For Educators</h2>
          <p className="section-description">Create engaging content and track student progress with AI assistance.</p>
          <div className="login-form">
            <input type="email" placeholder="Enter your email" className="form-input" />
            <input type="password" placeholder="Enter your password" className="form-input" />
            <button className="primary-btn">Access Educator Tools</button>
            <p className="form-text">Create custom course content, automate grading, and track student progress with AI.</p>
          </div>
        </div>
        <div className="section-preview">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
            </div>
            <div className="preview-content">
              <div className="preview-line"></div>
              <div className="preview-line short"></div>
              <div className="preview-line medium"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-tools-section">
        <h2>Our AI Learning Tools</h2>
        <p className="section-subtitle">Discover how our tools can help you achieve your learning goals.</p>
        <button className="primary-btn explore-btn">Explore All Tools</button>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Student" className="testimonial-avatar" />
            <h4>Sarah Johnson</h4>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>"The AI tools have completely transformed how I study. I'm learning faster than ever!"</p>
          </div>

          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Student" className="testimonial-avatar" />
            <h4>Michael Rodriguez</h4>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>"As a working student, the AI study planner helps me make the most of my limited study time."</p>
          </div>

          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Student" className="testimonial-avatar" />
            <h4>Emily Chen</h4>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>"The language learning AI has helped me improve my English speaking skills significantly."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiToolsPage;
