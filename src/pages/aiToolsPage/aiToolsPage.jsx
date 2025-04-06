import React from 'react';
import './aiToolsPage.css';
import { FaLightbulb, FaCalculator, FaCalendarAlt, FaLanguage, FaGraduationCap, FaChalkboardTeacher, FaUserGraduate, FaStar, FaRobot, FaBook, FaChartLine, FaBrain, FaBolt, FaFileAlt } from 'react-icons/fa';
import { IoMdBook, IoMdTime } from 'react-icons/io';
import { BrainCircuit } from 'lucide-react';
import { LuCircleCheckBig, LuBrainCircuit, LuSparkles } from "react-icons/lu";
import { FiUpload } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

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
        <p className="section-subtitle">
          Our intelligent features help both students and educators maximize their potential through cutting-edge AI technology.
        </p>
        
        <div className="tools-grid">
          <div className="tool-card summarizer-card">
            <div className="tool-header">
              <div className="tool-icon-wrapper blue">
                <IoMdBook className="tool-icon" />
              </div>
              <h3>Lecture Summarizer</h3>
            </div>
            <p className="tool-description">Our AI technology transforms lengthy lectures into concise <br /> summaries with key points, helping students study more efficiently.</p>
            <div className="tool-feature">
              <div className="feature-icon-wrapper">
                <LuCircleCheckBig className="feature-check-icon" />
              </div>
              <div className="feature-content">
                <h4>Three Summary Levels</h4>
                <p>Choose between short, medium, and long summaries based on your needs.</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="feature-icon-wrapper">
                <LuCircleCheckBig className="feature-check-icon" />
              </div>
              <div className="feature-content">
                <h4>Key Subject Extraction</h4>
                <p>Automatically identifies and highlights the most important concepts.</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="feature-icon-wrapper">
                <LuCircleCheckBig className="feature-check-icon" />
              </div>
              <div className="feature-content">
                <h4>File Upload Support</h4>
                <p>Upload lecture notes, PDFs, or images for instant summarization.</p>
              </div>
            </div>
          </div>

          <div className="tool-card assessment-card">
            <div className="tool-header">
              <div className="tool-icon-wrapper purple">
                <FaFileAlt className="tool-icon" />
              </div>
              <h3>Assessment Generator</h3>
            </div>
            <p className="tool-description">Create customized quizzes and exams in seconds with our <br /> AI assessment generator, saving educators valuable time.</p>
            <div className="tool-feature">
              <div className="feature-icon-wrapper">
                <LuCircleCheckBig className="feature-check-icon purple" />
              </div>
              <div className="feature-content">
                <h4>Flexible Question Count</h4>
                <p>Generate between 10-40 questions based on your requirements.</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="feature-icon-wrapper">
                <LuCircleCheckBig className="feature-check-icon purple" />
              </div>
              <div className="feature-content">
                <h4>Difficulty Settings</h4>
                <p>Choose from easy, medium, or hard difficulty levels for varied assessment.</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="feature-icon-wrapper">
                <LuCircleCheckBig className="feature-check-icon purple" />
              </div>
              <div className="feature-content">
                <h4>Content Upload</h4>
                <p>Upload syllabus materials to generate relevant, targeted questions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <LuBrainCircuit className="feature-icon" />
            </div>
            <h4>AI-Powered Analysis</h4>
            <p>Advanced algorithms to process and analyze educational content.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper green">
              <FiUpload className="feature-icon" />
            </div>
            <h4>Smart Uploads</h4>
            <p>Support for PDFs, images, and various document formats.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper purple">
              <IoMdTime className="feature-icon" />
            </div>
            <h4>Time-Saving</h4>
            <p>Cut hours of work down to minutes with automated tools.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <LuSparkles className="feature-icon" />
            </div>
            <h4>Customizable</h4>
            <p>Tailor outputs to your specific educational needs.</p>
          </div>
        </div>
      </section>
      {/* user Section */} 
      <section className="our-tools-section">
        <div className="section-header">
          <div className="section-icon-wrapper">
            <RiRobot2Line className="section-icon" />
          </div>
          <div className="header-content">
            <h2>Our AI Learning Tools</h2>
            <p className="section-subtitle">Powerful AI assistants designed specifically for students and educators.</p>
          </div>
        </div>
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
