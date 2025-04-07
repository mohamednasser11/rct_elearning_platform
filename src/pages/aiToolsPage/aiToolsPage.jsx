import React from 'react';
import './aiToolsPage.css';
import { FaLightbulb, FaCalculator, FaCalendarAlt, FaLanguage, FaGraduationCap, FaChalkboardTeacher, FaUserGraduate, FaStar, FaRobot, FaBook, FaChartLine, FaBrain, FaBolt, FaFileAlt } from 'react-icons/fa';
import { IoMdBook, IoMdTime } from 'react-icons/io';
import { IoBookOutline } from 'react-icons/io5';
import { BrainCircuit } from 'lucide-react';
import { LuCircleCheckBig, LuBrainCircuit, LuSparkles, LuCloud } from "react-icons/lu";
import { FiUpload } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import { BiSolidBookAlt } from 'react-icons/bi';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsCheck2Square } from "react-icons/bs";

const AiToolsPage = () => {
  const [activeLength, setActiveLength] = React.useState('medium');
  const [activeTab, setActiveTab] = React.useState('student');
  const [questionCount, setQuestionCount] = React.useState(20);
  
  // Simple toggle function with direct state update
  const handleTabToggle = (tab) => {
    console.log('Switching to tab:', tab);
    setActiveTab(tab);
  };
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
      {/* AI Tools Toggle Section */}
      <section className="our-tools-section">
        <div className="section-header">
          <div className="section-icon-wrapper">
            <RiRobot2Line className="section-icon" />
          </div>
          <div className="header-content">
            <h2>Our AI Learning Tools</h2>
            <p className="section-subtitle">Powerful AI assistants designed specifically for students and educators.</p>
            <div className="toggle-switch-wrapper">
              <div className="toggle-switch">
                <button 
                  className={`toggle-btn ${activeTab === 'student' ? 'active' : ''}`}
                  onClick={() => handleTabToggle('student')}
                >
                  <FaUserGraduate className="toggle-icon" />
                  For Students
                </button>
                <button 
                  className={`toggle-btn ${activeTab === 'educator' ? 'active' : ''}`}
                  onClick={() => handleTabToggle('educator')}
                >
                  <FaChalkboardTeacher className="toggle-icon" />
                  For Educators
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="tools-content">
          {activeTab === 'student' ? (
            <div className="student-tools tab-content">
              <div className="tab-header">
                <BiSolidBookAlt className="tab-main-icon" />
                <h2 className="tab-title">AI Lecture Summarizer</h2>
              </div>
            <div className="tab-content-section">
              <div className="content-wrapper">
                <h3 className="content-subtitle">AI Lecture Summarization</h3>
                <p className="content-description">
                  Our AI analyzes your lecture materials and generates <br /> comprehensive summaries at your preferred level of detail. <br /> Extract key concepts, identify main subjects, and save hours of <br /> study time.
                </p>
                <div className="features-card">
                  <h4 className="features-title">Key Features:</h4>
                  <ul className="features-list">
                    <li>
                      <div><MdOutlineKeyboardArrowRight className="feature-arrow" /><strong>Three summary levels:</strong> Choose between short, medium, or long</div>
                      <div>summaries based on your needs</div>
                    </li>
                    <li>
                      <div><MdOutlineKeyboardArrowRight className="feature-arrow" /><strong>Subject extraction:</strong> Automatically identifies and organizes key</div>
                      <div>subjects and topics</div>
                    </li>
                    <li>
                      <div><MdOutlineKeyboardArrowRight className="feature-arrow" /><strong>Smart formatting:</strong> Structured summaries with headings, bullet</div>
                      <div>points, and highlights</div>
                    </li>
                    <li>
                      <div><MdOutlineKeyboardArrowRight className="feature-arrow" /><strong>Multiple file support:</strong> Upload lecture slides, PDFs, images, or</div>
                      <div>screenshots</div>
                    </li>
                  </ul>
                </div>
                <button className="try-button">
                  Try AI summarization
                  <LuSparkles className="button-icon" />
                </button>
              </div>
              <div className="drop-box">
                <h3 className="drop-title">Lecture Summarizer</h3>
                <p className="drop-description">Upload your lecture material and select summary length</p>
                <div className="drop-zone">
                  <div className="drop-icon">
                    <LuCloud className="cloud-icon" />
                  </div>
                  <h4 className="drop-zone-title">Drag & drop files here</h4>
                  <p className="drop-zone-subtitle">or click to browse (PDFs, images)</p>
                  <button className="select-files-btn">Select Files</button>
                </div>
                <div className="summary-length">
                  <h4 className="summary-title">Summary Length</h4>
                  <div className="length-options">
                    <button 
                      className={`length-btn ${activeLength === 'short' ? 'active' : ''}`}
                      onClick={() => setActiveLength('short')}
                    >Short</button>
                    <button 
                      className={`length-btn ${activeLength === 'medium' ? 'active' : ''}`}
                      onClick={() => setActiveLength('medium')}
                    >Medium</button>
                    <button 
                      className={`length-btn ${activeLength === 'long' ? 'active' : ''}`}
                      onClick={() => setActiveLength('long')}
                    >Long</button>
                  </div>
                  <p className="length-description">Balanced summary with key concepts and supporting details</p>
                </div>
                <button className="generate-btn">
                  Generate Summary
                  <LuSparkles className="generate-icon" />
                </button>
                <p className="upload-text">Upload your PDF or image files to get started</p>
              </div>
            </div>
          </div>
          ) : (
            <div className="educator-tools tab-content">
              <div className="educator-layout">
                {/* Left Panel - Exam Generator Tool */}
                <div className="exam-generator-panel">
                  <h3 className="exam-title">Exam Generator</h3>
                  <p className="exam-subtitle">Create customized exams from your course materials</p>
                  
                  <div className="file-upload-box">
                    <div className="upload-area-container">
                      <div className="upload-icon-wrapper">
                        <FiUpload className="upload-cloud-icon" />
                      </div>
                      <p className="upload-title">Drag & drop files here</p>
                      <p className="upload-subtitle">or click to browse (PDFs, images)</p>
                      <button className="select-files-button">Select Files</button>
                    </div>
                  </div>
                  
                  <div className="questions-slider-container">
                    <p className="slider-label">Number of Questions: {questionCount}</p>
                    <div className="slider-wrapper">
                      <input 
                        type="range" 
                        min="10" 
                        max="40" 
                        value={questionCount}
                        onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                        className="questions-slider" 
                      />
                      <div className="slider-numbers">
                        <span className="slider-min">10</span>
                        <span className="slider-mid">25</span>
                        <span className="slider-max">40</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="difficulty-container">
                    <p className="difficulty-label">Difficulty Level</p>
                    <div className="difficulty-buttons">
                      <button 
                        className={`difficulty-btn easy ${activeLength === 'easy' ? 'active' : ''}`}
                        onClick={() => {
                          setActiveLength('easy');
                          setQuestionCount(10);
                        }}
                      >Easy</button>
                      <button 
                        className={`difficulty-btn medium ${activeLength === 'medium' ? 'active' : ''}`}
                        onClick={() => {
                          setActiveLength('medium');
                          setQuestionCount(25);
                        }}
                      >Medium</button>
                      <button 
                        className={`difficulty-btn hard ${activeLength === 'hard' ? 'active' : ''}`}
                        onClick={() => {
                          setActiveLength('hard');
                          setQuestionCount(40);
                        }}
                      >Hard</button>
                    </div>
                  </div>
                  
                  <div className="focus-area-container">
                    <p className={`focus-text ${activeLength}`}>
                      {activeLength === 'easy' ? 'Basic recall and understanding questions' : 
                       activeLength === 'medium' ? 'Application and analysis of concepts' : 
                       'Advanced synthesis and evaluation questions'}
                    </p>
                  </div>
                  
                  <button className="generate-exam-button">
                    Generate Exam <LuSparkles className="button-sparkle" />
                  </button>
                  
                  <p className="includes-note">Includes both questions and answer key</p>
                </div>
                
                {/* Right Panel - Features */}
                <div className="features-panel">
                  <div className="educator-header">
                    <div className="educator-icon-wrapper">
                      <RiRobot2Line className="educator-icon" />
                    </div>
                    <h2 className="educator-heading">For Educators</h2>
                  </div>
                  
                  <h3 className="tool-name">AI Exam Generator</h3>
                  
                  <p className="tool-description">
                    Create comprehensive exams and assessments in seconds. Our
                    AI analyzes your course materials to generate relevant
                    questions at your specified difficulty level, saving you hours of
                    preparation time.
                  </p>
                  
                  <div className="key-features-container">
                    <h4 className="features-title">Key Features:</h4>
                    <ul className="features-list">
                      <li className="feature-item">
                        <span className="feature-arrow">›</span>
                        <span className="feature-text">
                          <strong>Customizable question count:</strong> Generate between 10-40
                          questions per exam
                        </span>
                      </li>
                      <li className="feature-item">
                        <span className="feature-arrow">›</span>
                        <span className="feature-text">
                          <strong>Difficulty settings:</strong> Choose from easy, medium, or hard
                          difficulty levels
                        </span>
                      </li>
                      <li className="feature-item">
                        <span className="feature-arrow">›</span>
                        <span className="feature-text">
                          <strong>Multiple question types:</strong> Multiple choice, short answer, essay
                          prompts, and more
                        </span>
                      </li>
                      <li className="feature-item">
                        <span className="feature-arrow">›</span>
                        <span className="feature-text">
                          <strong>Automatic answer keys:</strong> Complete with explanations for each
                          question
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="time-saving-box">
                    <div className="time-icon-wrapper">
                      <BsCheck2Square className="time-icon" />
                    </div>
                    <div className="time-content">
                      <h4 className="time-title">Time-Saving Solution</h4>
                      <p className="time-description">Reduce exam preparation time by up to 90%</p>
                    </div>
                  </div>
                  
                  <button className="try-generator-button">
                    Try AI Exam Generator <LuSparkles className="button-sparkle" />
                  </button>
                </div>
              </div>
            </div>
          )}
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
