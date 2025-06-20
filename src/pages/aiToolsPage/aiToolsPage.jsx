import React from "react";
import "./aiToolsPage.css";
import aiToolsService from "../../services/aiToolsService";
import {
  FaLightbulb,
  FaSpinner,
  FaCalculator,
  FaCalendarAlt,
  FaLanguage,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaStar,
  FaRobot,
  FaBook,
  FaChartLine,
  FaBrain,
  FaBolt,
  FaFileAlt,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";
import { IoMdBook, IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { BrainCircuit } from "lucide-react";
import {
  LuCircleCheckBig,
  LuBrainCircuit,
  LuSparkles,
  LuCloud,
  LuX,
} from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { BiSolidBookAlt } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsCheck2Square } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const suppertedTypes = ["application/pdf", "text/plain"];

const AiToolsPage = () => {
  const navigate = useNavigate();
  const [activeLength, setActiveLength] = React.useState("short");
  const [activeDifficulty, setActiveDifficulty] = React.useState("easy");
  const [activeTab, setActiveTab] = React.useState("student");
  const [questionCount, setQuestionCount] = React.useState(10);
  const [studentFile, setStudentFile] = React.useState(null);
  const [educatorFile, setEducatorFile] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedResponse, setGenerateResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Refs for file inputs
  const studentFileRef = React.useRef(null);
  const educatorFileRef = React.useRef(null);

  const handleGenerateSummary = async () => {
    if (isGenerating) return;

    setError(null);

    if (studentFile == null) {
      setError("No file selected");
      return;
    }

    if (!suppertedTypes.includes(studentFile.type)) {
      setError("Unsupported format");
      return;
    }

    setIsGenerating(true);
    setGenerateResponse(null);
    try {
      const res = await aiToolsService.summarize(studentFile, activeLength);
      setGenerateResponse(res);
      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please contact support");
      setIsGenerating(false);
    }
  };

  const handleGenerateExam = async () => {
    if (isGenerating) return;

    if (educatorFile == null) {
      setError("No file selected");
      return;
    }

    setError(null);

    if (!suppertedTypes.includes(educatorFile.type)) {
      setError("Unsupported format");
      return;
    }

    setIsGenerating(true);
    setGenerateResponse(null);
    try {
      const res = await aiToolsService.generateExam(
        educatorFile,
        activeLength,
        questionCount,
      );
      setGenerateResponse(res);
      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please contact support");
      setIsGenerating(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (file, setFile) => {
    if (isGenerating) return;

    setError(null);

    if (file) {
      setFile(file);
    }
  };

  // Click handlers for "Select Files" buttons
  const handleStudentSelectFileClick = () => {
    if (studentFileRef.current) {
      studentFileRef.current.value = null;
      studentFileRef.current.click();
    }
  };

  const handleEducatorSelectFileClick = () => {
    if (educatorFileRef.current) {
      educatorFileRef.current.value = null;
      educatorFileRef.current.click();
    }
  };

  // Change handlers for file inputs
  const handleStudentFileChange = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file, setStudentFile);
  };

  const handleEducatorFileChange = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file, setEducatorFile);
  };

  // Remove file handlers
  const handleRemoveStudentFile = () => {
    if (isGenerating) return;

    setError(null);

    setStudentFile(null);
    if (studentFileRef.current) {
      studentFileRef.current.value = null;
    }
  };

  const handleRemoveEducatorFile = () => {
    if (isGenerating) return;

    setEducatorFile(null);
    if (educatorFileRef.current) {
      educatorFileRef.current.value = null;
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    if (isGenerating) return;

    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    if (isGenerating) return;

    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e, setFile) => {
    if (isGenerating) return;

    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, setFile);
  };

  // Initialize slider fill effect
  React.useEffect(() => {
    const slider = document.querySelector(".questions-slider");
    if (slider) {
      const min = 10;
      const max = 40;
      const ratio = (questionCount - min) / (max - min);
      slider.style.setProperty("--ratio", ratio);
    }
  }, [questionCount]);

  // Simple toggle function with direct state update
  const handleTabToggle = (tab) => {
    if (tab == activeTab || isGenerating) return;

    setError(null);
    setGenerateResponse(null);
    setStudentFile(null);
    setEducatorFile(null);
    setActiveTab(tab);
  };

  // Add download handler function inside AiToolsPage
  const handleDownloadFile = () => {
    if (isGenerating || generatedResponse == null) return;
    const blob = new Blob([generatedResponse], {
      type: "application/octet-stream",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_response.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ai-tools-container">
      {/* Hero Section */}
      <section className="ai-hero-section">
        <div className="ai-hero-content">
          <h1>
            Revolutionize
            <br />
            Learning with
            <br />
            <span className="highlight" style={{ whiteSpace: "nowrap" }}>
              AI-Powered Education
            </span>
          </h1>
          <p className="ai-hero-subtitle">
            Beyond the Blackboard helps students and educators unlock their full
            potential with intelligent AI tools that summarize lectures and
            generate customized assessments.
          </p>
          <div className="ai-cta-buttons">
            <button
              className="ai-primary-btn"
              onClick={() => navigate("/signup")}
            >
              Get Started free <FaArrowRight className="btn-arrow" />
            </button>
            <button className="ai-secondary-btn">Watch Demo</button>
          </div>
          <div className="ai-hero-features">
            <span>
              <BrainCircuit className="ai-hero-icon" />{" "}
              <span className="feature-text">AI-Powered</span>
            </span>
            <span>
              <FaFileAlt className="ai-hero-icon" />{" "}
              <span className="feature-text">Custom Summarise</span>
            </span>
            <span>
              <IoMdBook className="ai-hero-icon" />{" "}
              <span className="feature-text">Smart Assessments</span>
            </span>
          </div>
        </div>
        <div className="ai-hero-preview">
          <div className="preview-card-small">
            <div className="preview-header">
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
            </div>
            <div className="preview-content">
              <h3 className="preview-title">AI Question Generator</h3>
              <div className="preview-line"></div>
              <div className="preview-line short"></div>
              <div className="preview-line medium"></div>
            </div>
          </div>
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
        <h2>
          AI-Powered <span className="highlight">Learning Tools</span>
        </h2>
        <p className="section-subtitle">
          Our intelligent features help both students and educators maximize
          their potential through cutting-edge AI technology.
        </p>

        <div className="tools-grid">
          <div className="tool-card summarizer-card">
            <div className="tool-header">
              <div className="tool-icon-wrapper blue">
                <IoMdBook className="tool-icon" />
              </div>
              <h3>Lecture Summarizer</h3>
            </div>
            <p className="tool-description">
              Our AI technology transforms lengthy lectures into concise
              summaries with key points, helping students study more
              efficiently.
            </p>
            <div className="tool-feature">
              <div className="ai-feature-icon-wrapper">
                <LuCircleCheckBig className="ai-Lecture-Summarizer-check-icon" />
              </div>
              <div className="feature-content">
                <h4>Three Summary Levels</h4>
                <p>
                  Choose between short, medium, and long summaries based on your
                  needs.
                </p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="ai-feature-icon-wrapper">
                <LuCircleCheckBig className="ai-Lecture-Summarizer-check-icon" />
              </div>
              <div className="feature-content">
                <h4>Key Subject Extraction</h4>
                <p>
                  Automatically identifies and highlights the most important
                  concepts.
                </p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="ai-feature-icon-wrapper">
                <LuCircleCheckBig className="ai-Lecture-Summarizer-check-icon" />
              </div>
              <div className="feature-content">
                <h4>File Upload Support</h4>
                <p>
                  Upload lecture notes, PDFs, or images for instant
                  summarization.
                </p>
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
            <p className="tool-description">
              Create customized quizzes and exams in seconds with our AI
              assessment generator, saving educators valuable time.
            </p>
            <div className="tool-feature">
              <div className="ai-feature-icon-wrapper">
                <LuCircleCheckBig className="ai-Assessment-Generator-check-icon purple" />
              </div>
              <div className="feature-content">
                <h4>Flexible Question Count</h4>
                <p>
                  Generate between 10-40 questions based on your requirements.
                </p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="ai-feature-icon-wrapper">
                <LuCircleCheckBig className="ai-Assessment-Generator-check-icon purple" />
              </div>
              <div className="feature-content">
                <h4>Difficulty Settings</h4>
                <p>
                  Choose from easy, medium, or hard difficulty levels for varied
                  assessment.
                </p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="ai-feature-icon-wrapper">
                <LuCircleCheckBig className="ai-Assessment-Generator-check-icon purple" />
              </div>
              <div className="feature-content">
                <h4>Content Upload</h4>
                <p>
                  Upload syllabus materials to generate relevant, targeted
                  questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-feature-cards">
          <div className="feature-card">
            <div className="ai-feature-icon-wrapper blue">
              <LuBrainCircuit className="feature-icon" />
            </div>
            <h4>AI-Powered Analysis</h4>
            <p>
              Advanced algorithms to process and analyze educational content.
            </p>
          </div>
          <div className="feature-card">
            <div className="ai-feature-icon-wrapper green">
              <FiUpload className="feature-icon" />
            </div>
            <h4>Smart Uploads</h4>
            <p>Support for PDFs, images, and various document formats.</p>
          </div>
          <div className="feature-card">
            <div className="ai-feature-icon-wrapper purple">
              <IoMdTime className="feature-icon" />
            </div>
            <h4>Time-Saving</h4>
            <p>Cut hours of work down to minutes with automated tools.</p>
          </div>
          <div className="feature-card">
            <div className="ai-feature-icon-wrapper blue">
              <LuSparkles className="feature-icon" />
            </div>
            <h4>Customizable</h4>
            <p>Tailor outputs to your specific educational needs.</p>
          </div>
        </div>
      </section>
      {/* AI Tools Toggle Section */} {/*our ai tools section header*/}
      <section className="our-tools-section">
        <h2 className="our-tools-section-title">Our AI Learning Tools</h2>
        <p className="section-subtitle">
          Powerful AI assistants designed specifically for students and
          educators.
        </p>
        <div className="tools-content">
          <div className="toggle-switch-wrapper">
            <div className="toggle-switch">
              <button
                className={`toggle-btn ${activeTab === "student" ? "active" : ""}`}
                onClick={() => handleTabToggle("student")}
              >
                <FaUserGraduate className="toggle-icon" />
                For Students
              </button>
              <button
                className={`toggle-btn ${activeTab === "educator" ? "active" : ""}`}
                onClick={() => handleTabToggle("educator")}
              >
                <FaChalkboardTeacher className="toggle-icon" />
                For Educators
              </button>
            </div>
          </div>
          {activeTab === "student" ? (
            <div className="student-tools ai-tools-content">
              <div className="tab-header">
                <BiSolidBookAlt className="tab-main-icon" />
                <h2 className="for-student-tab-header">
                  AI Lecture Summarizer
                </h2>
              </div>
              <div className="tab-content-section align-right">
                <div className="content-wrapper">
                  <h3 className="content-subtitle">AI Lecture Summarization</h3>
                  <p className="content-description">
                    Our AI analyzes your lecture materials and generates <br />{" "}
                    comprehensive summaries at your preferred level of detail.{" "}
                    <br /> Extract key concepts, identify main subjects, and
                    save hours of <br /> study time.
                  </p>
                  <div className="features-card">
                    <h4 className="features-title">Key Features:</h4>
                    <ul className="features-list">
                      <li>
                        <div>
                          <MdOutlineKeyboardArrowRight className="new-arrows-student" />
                          <strong>Three summary levels:</strong> Choose between
                          short, medium, or long summaries based on your needs
                        </div>
                      </li>
                      <li>
                        <div>
                          <MdOutlineKeyboardArrowRight className="new-arrows-student" />
                          <strong>Subject extraction:</strong> Automatically
                          identifies and organizes key subjects and topics
                        </div>
                      </li>
                      <li>
                        <div>
                          <MdOutlineKeyboardArrowRight className="new-arrows-student" />
                          <strong>Smart formatting:</strong> Structured
                          summaries with headings, bullet points, and highlights
                        </div>
                        <div></div>
                      </li>
                      <li>
                        <div>
                          <MdOutlineKeyboardArrowRight className="new-arrows-student" />
                          <strong>Multiple file support:</strong> Upload lecture
                          slides, PDFs, images, or screenshots
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="drop-box">
                  <h3 className="drop-title">Lecture Summarizer</h3>
                  <p className="drop-description">
                    Upload your lecture material and select summary length
                  </p>
                  <div
                    className={`drop-zone ${isDragging ? "dragging" : ""} ${studentFile ? "has-file" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, setStudentFile)}
                  >
                    <div className="drop-icon">
                      <LuCloud className="cloud-icon" />
                    </div>
                    <h4 className="drop-zone-title">Drag & drop files here</h4>
                    <p className="drop-zone-subtitle">
                      or click to browse (PDFs, Text)
                    </p>
                    <input
                      type="file"
                      ref={studentFileRef}
                      style={{ display: "none" }}
                      onChange={handleStudentFileChange}
                      accept=".pdf,.doc,.docx,.txt,image/*"
                    />
                    <button
                      className="select-files-btn"
                      onClick={handleStudentSelectFileClick}
                      disabled={isGenerating}
                    >
                      Select Files
                    </button>
                    {studentFile && (
                      <div className="file-name-container visible">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{studentFile.name}</span>
                        <span className="file-size">{studentFile.size}</span>
                        <button
                          className="remove-file"
                          onClick={handleRemoveStudentFile}
                        >
                          <LuX />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="summary-length">
                    <h4 className="summary-title">Summary Length</h4>
                    <div className="length-options">
                      <button
                        className={`length-btn ${activeLength === "short" ? "active" : ""}`}
                        onClick={() => setActiveLength("short")}
                        disabled={isGenerating}
                      >
                        Short
                      </button>
                      <button
                        className={`length-btn ${activeLength === "medium" ? "active" : ""}`}
                        onClick={() => setActiveLength("medium")}
                        disabled={isGenerating}
                      >
                        Medium
                      </button>
                      <button
                        className={`length-btn ${activeLength === "long" ? "active" : ""}`}
                        onClick={() => setActiveLength("long")}
                        disabled={isGenerating}
                      >
                        Long
                      </button>
                    </div>
                    <p className="length-description">
                      Balanced summary with key concepts and supporting details
                    </p>
                  </div>
                  <button
                    className="generate-btn"
                    disabled={isGenerating}
                    onClick={handleGenerateSummary}
                  >
                    Generate Summary
                    {isGenerating ? (
                      <FaSpinner className="spin" />
                    ) : (
                      <LuSparkles className="generate-icon" />
                    )}
                  </button>
                  {!isGenerating && generatedResponse != null ? (
                    <button
                      className="download-result-btn"
                      style={{
                        marginTop: "1rem",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                      onClick={handleDownloadFile}
                    >
                      <FaArrowDown style={{ fontSize: "1.1rem" }} /> Download
                      Result
                    </button>
                  ) : (
                    <></>
                  )}
                  {error != null ? (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="educator-tools ai-tools-content">
              <div className="educator-layout">
                {/* Left Panel - Features */}
                <div className="features-panel">
                  <div className="educator-header">
                    <div className="ai-educator-icon-wrapper">
                      <RiRobot2Line className="ai-educator-icon" />
                    </div>
                    <h2 className="educator-heading">For Educators</h2>
                  </div>

                  <h3 className="tool-name">AI Exam Generator</h3>

                  <p className="tool-description">
                    Create comprehensive exams and assessments in seconds. Our
                    AI analyzes your course materials to generate relevant
                    questions at your specified difficulty level, saving you
                    hours of preparation time.
                  </p>

                  <div className="key-features-container">
                    <h4 className="features-title">Key Features:</h4>
                    <ul className="features-list">
                      <li className="feature-item">
                        <span className="feature-arrow educator-arrow">›</span>
                        <span className="feature-text">
                          <strong>Customizable question count:</strong> Generate
                          between 10-40 questions per exam
                        </span>
                      </li>
                      <li className="feature-item">
                        <span className="feature-arrow educator-arrow">›</span>
                        <span className="feature-text">
                          <strong>Difficulty settings:</strong> Choose from
                          easy, medium, or hard difficulty levels
                        </span>
                      </li>
                      <li className="feature-item">
                        <span className="feature-arrow educator-arrow">›</span>
                        <span className="feature-text">
                          <strong>Multiple question types:</strong> Multiple
                          choice, short answer, essay prompts, and more
                        </span>
                      </li>
                      <li className="feature-item">
                        <span className="feature-arrow educator-arrow">›</span>
                        <span className="feature-text">
                          <strong>Automatic answer keys:</strong> Complete with
                          explanations for each question
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
                      <p className="time-description">
                        Reduce exam preparation time by up to 90%
                      </p>
                    </div>
                  </div>
                </div>
                {/* Right Panel - Exam Generator Tool */}
                <div className="exam-generator-panel">
                  <h3 className="exam-title">Exam Generator</h3>
                  <p className="exam-subtitle">
                    Create customized exams from your course materials
                  </p>

                  <div
                    className={`drop-zone ${isDragging ? "dragging" : ""} ${educatorFile ? "has-file" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, setEducatorFile)}
                  >
                    <div className="drop-icon">
                      <LuCloud className="cloud-icon" />
                    </div>
                    <h4 className="drop-zone-title">Drag & drop files here</h4>
                    <p className="drop-zone-subtitle">
                      or click to browse (PDFs, images)
                    </p>
                    <input
                      type="file"
                      ref={educatorFileRef}
                      style={{ display: "none" }}
                      onChange={handleEducatorFileChange}
                      accept=".pdf,.doc,.docx,.txt,image/*"
                    />
                    <button
                      className="select-files-btn"
                      onClick={handleEducatorSelectFileClick}
                      disabled={isGenerating}
                    >
                      Select Files
                    </button>
                    {educatorFile && (
                      <div className="file-name-container visible">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{educatorFile.name}</span>
                        <span className="file-size">{educatorFile.size}</span>
                        <button
                          className="remove-file"
                          onClick={handleRemoveEducatorFile}
                        >
                          <LuX />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="questions-slider-container">
                    <p className="slider-label">
                      Number of Questions: {questionCount}
                    </p>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min="10"
                        max="40"
                        value={questionCount}
                        onChange={(e) => {
                          if (isGenerating) return;

                          const newValue = parseInt(e.target.value);
                          setQuestionCount(newValue);

                          // Update the slider fill effect
                          const min = 10;
                          const max = 40;
                          const ratio = (newValue - min) / (max - min);
                          e.target.style.setProperty("--ratio", ratio);
                        }}
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
                        className={`difficulty-btn easy ${activeDifficulty === "easy" ? "active" : ""}`}
                        onClick={() => setActiveDifficulty("easy")}
                        disabled={isGenerating}
                      >
                        Easy
                      </button>
                      <button
                        className={`difficulty-btn medium ${activeDifficulty === "medium" ? "active" : ""}`}
                        onClick={() => setActiveDifficulty("medium")}
                        disabled={isGenerating}
                      >
                        Medium
                      </button>
                      <button
                        className={`difficulty-btn hard ${activeDifficulty === "hard" ? "active" : ""}`}
                        onClick={() => setActiveDifficulty("hard")}
                        disabled={isGenerating}
                      >
                        Hard
                      </button>
                    </div>
                  </div>

                  <div className="focus-area-container">
                    <p className={`focus-text ${activeDifficulty}`}>
                      {activeDifficulty === "easy"
                        ? "Basic recall and understanding questions"
                        : activeDifficulty === "medium"
                          ? "Application and analysis of concepts"
                          : activeDifficulty === "hard"
                            ? "Advanced synthesis and evaluation questions"
                            : "Select a difficulty level to see the focus area."}
                    </p>
                  </div>

                  <button
                    className="generate-exam-button"
                    onClick={handleGenerateExam}
                    disabled={isGenerating}
                  >
                    Generate Exam
                    {isGenerating ? (
                      <FaSpinner className="spin" />
                    ) : (
                      <LuSparkles className="generate-icon" />
                    )}
                  </button>

                  {!isGenerating && generatedResponse != null ? (
                    <button
                      className="download-result-btn"
                      style={{
                        marginTop: "1rem",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                      onClick={handleDownloadFile}
                    >
                      <FaArrowDown style={{ fontSize: "1.1rem" }} /> Download
                      Result
                    </button>
                  ) : (
                    <></>
                  )}
                  {error != null ? (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="ai-testimonials-section">
        <h2>What Our Students Say</h2>
        <p className="testimonials-subtitle">
          Hear from students who've transformed their learning experience with
          our platform
        </p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-top">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Student"
                className="testimonial-avatar"
              />
              <div className="testimonial-details">
                <h4>Sarah Johnson</h4>
                <p className="student-title">Computer Science Student</p>
              </div>
            </div>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>
              "The AI flashcard tool completely changed how I study, I can
              quickly create flashcards from any lecture and the system even
              identifies what concepts I'm struggling with."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-top">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Student"
                className="testimonial-avatar"
              />
              <div className="testimonial-details">
                <h4>Michael Rodriguez</h4>
                <p className="student-title">Physics Major</p>
              </div>
            </div>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>
              "I was struggling with quantum physics until I used the AI
              summarization tool, it breaks down complex concepts into
              understandable chunks and generates practice problems at just the
              right difficulty."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-top">
              <img
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="Student"
                className="testimonial-avatar"
              />
              <div className="testimonial-details">
                <h4>Emily Chen</h4>
                <p className="student-title">Biology Professor</p>
              </div>
            </div>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>
              "As an educator, the exam generation tools save me hours of work
              each week. I can create assessments that truly test understanding
              rather than memorizing."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiToolsPage;
