import React from 'react';
import './aiToolsPage.css';

const AiToolsPage = () => {
  return (
    <div className="ai-tools-container">
      <h1>AI Tools</h1>
      <div className="content">
        <section className="features">
          <h2>Available AI Tools</h2>
          <div className="tools-grid">
            <div className="tool-card">
              <h3>AI Writing Assistant</h3>
              <p>Get help with writing assignments and essays</p>
            </div>
            <div className="tool-card">
              <h3>Math Problem Solver</h3>
              <p>Step-by-step solutions for math problems</p>
            </div>
            <div className="tool-card">
              <h3>Study Plan Generator</h3>
              <p>Personalized study schedules based on your goals</p>
            </div>
            <div className="tool-card">
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
