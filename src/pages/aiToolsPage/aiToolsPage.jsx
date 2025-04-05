import React from 'react';
import './aiToolsPage.css';
import { FaLightbulb, FaCalculator, FaCalendarAlt, FaLanguage } from 'react-icons/fa';

const AiToolsPage = () => {
  return (
    <div className="ai-tools-container">
      <h1>AI Learning Tools</h1>
      <p className="tools-intro">
        Enhance your learning experience with our AI-powered tools.
      </p>
      
      <div className="content">
        <section className="features">
          <div className="tools-grid">
            <div className="tool-card">
              <FaLightbulb className="tool-icon" />
              <h3>AI Writing Assistant</h3>
              <p>Get help with writing assignments and essays</p>

            </div>

            <div className="tool-card">
              <FaCalculator className="tool-icon" />
              <h3>Math Problem Solver</h3>
              <p>Step-by-step solutions for math problems</p>

            </div>

            <div className="tool-card">
              <FaCalendarAlt className="tool-icon" />
              <h3>Study Plan Generator</h3>
              <p>Personalized study schedules based on your goals</p>

            </div>

            <div className="tool-card">
              <FaLanguage className="tool-icon" />
              <h3>Language Learning AI</h3>
              <p>Interactive language practice with AI</p>
 
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AiToolsPage;
