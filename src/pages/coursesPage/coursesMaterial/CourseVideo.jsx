import React, { useState } from 'react';
import { FaDownload, FaExpand, FaCog, FaVolumeUp, FaPause, FaPlay, FaBackward, FaForward } from 'react-icons/fa';
import './CourseVideo.css';

const CourseVideo = ({ lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(80);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Video controls handlers
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };
  
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  
  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
  };

  // Format time function
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="course-video-container">
      <div 
        className="video-player" 
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video thumbnail with play button for demo */}
        <div className="video-screen" style={{ backgroundImage: `url(${lesson.thumbnail || '/course-thumbnail.jpg'})` }}>
          {!isPlaying && (
            <div className="play-overlay" onClick={togglePlay}>
              <div className="play-button">
                <FaPlay />
              </div>
            </div>
          )}
        </div>

        {/* Video controls */}
        <div className={`video-controls ${showControls ? 'show' : ''}`}>
          <div className="progress-container">
            <input 
              type="range" 
              className="progress-bar" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={handleProgressChange} 
            />
            <div className="time-display">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(lesson.lengthSeconds || 350)}</span>
            </div>
          </div>

          <div className="control-buttons">
            <div className="left-controls">
              <button className="control-button" onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button className="control-button">
                <FaBackward />
              </button>
              <button className="control-button">
                <FaForward />
              </button>
              <div className="volume-control">
                <FaVolumeUp />
                <input 
                  type="range" 
                  className="volume-slider" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={handleVolumeChange} 
                />
              </div>
            </div>

            <div className="right-controls">
              <div className="playback-speed">
                <button className="speed-button" onClick={() => changePlaybackRate(1)}>1x</button>
                <div className="speed-options">
                  <button onClick={() => changePlaybackRate(0.5)}>0.5x</button>
                  <button onClick={() => changePlaybackRate(0.75)}>0.75x</button>
                  <button onClick={() => changePlaybackRate(1)} className="active">1x</button>
                  <button onClick={() => changePlaybackRate(1.25)}>1.25x</button>
                  <button onClick={() => changePlaybackRate(1.5)}>1.5x</button>
                  <button onClick={() => changePlaybackRate(2)}>2x</button>
                </div>
              </div>
              <button className="control-button">
                <FaCog />
              </button>
              <button className="control-button">
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
