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
        {/* Video thumbnail with play button overlay */}
        <div className="video-screen" style={{ backgroundImage: `url(${lesson?.thumbnail || '/course-thumbnail.jpg'})` }}>
          {!isPlaying && (
            <div className="play-overlay" onClick={togglePlay}>
              <div className="play-button">
                <FaPlay />
              </div>
            </div>
          )}
        </div>        
      </div>
    </div>
  );
};

export default CourseVideo;
