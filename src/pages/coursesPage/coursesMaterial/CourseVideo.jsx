import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FaDownload, FaExpand, FaCog, FaVolumeUp, FaPause, FaPlay, FaBackward, FaForward } from 'react-icons/fa';
import { VIDEO_PLAYER, VIDEO_STATES, VIDEO_EVENTS, VIDEO_MESSAGES } from '../../../constants/videoPlayer';
import './CourseVideo.css';

const CourseVideo = ({ lesson }) => {
  // Refs
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // State management
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    progress: VIDEO_PLAYER.DEFAULT_PROGRESS,
    volume: VIDEO_PLAYER.DEFAULT_VOLUME,
    playbackRate: VIDEO_PLAYER.DEFAULT_PLAYBACK_RATE,
    showControls: true,
    error: null,
    loading: false
  });

  // Memoized handlers
  const togglePlay = useCallback(() => {
    setVideoState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  const handleProgressChange = useCallback((e) => {
    const newProgress = parseFloat(e.target.value);
    setVideoState(prev => ({
      ...prev,
      progress: newProgress
    }));
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVideoState(prev => ({
      ...prev,
      volume: newVolume
    }));
  }, []);

  const changePlaybackRate = useCallback((rate) => {
    setVideoState(prev => ({
      ...prev,
      playbackRate: rate
    }));
  }, []);

  const handleMouseEnter = useCallback(() => {
    setVideoState(prev => ({
      ...prev,
      showControls: true
    }));
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    controlsTimeoutRef.current = setTimeout(() => {
      setVideoState(prev => ({
        ...prev,
        showControls: false
      }));
    }, VIDEO_PLAYER.CONTROLS_TIMEOUT);
  }, []);

  // Utility functions
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);

  // Effects
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Render helpers
  const renderPlaybackRateOptions = () => (
    <div className="speed-options">
      {VIDEO_PLAYER.PLAYBACK_RATES.map(rate => (
        <button
          key={rate}
          className={rate === videoState.playbackRate ? 'active' : ''}
          onClick={() => changePlaybackRate(rate)}
        >
          {rate}x
        </button>
      ))}
    </div>
  );

  const renderVideoControls = () => (
    <div className={`video-controls ${videoState.showControls ? 'show' : ''}`}>
      <div className="left-controls">
        <button className="control-button" onClick={togglePlay}>
          {videoState.isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="volume-control">
          <FaVolumeUp />
          <input
            type="range"
            className="volume-slider"
            min={VIDEO_PLAYER.VOLUME_MIN}
            max={VIDEO_PLAYER.VOLUME_MAX}
            value={videoState.volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div className="right-controls">
        <div className="playback-speed">
          <button className="speed-button">
            {videoState.playbackRate}x
          </button>
          {renderPlaybackRateOptions()}
        </div>
        <button className="control-button">
          <FaExpand />
        </button>
      </div>
    </div>
  );

  return (
    <div className="course-video-container">
      <div 
        className="video-player" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="video-screen" 
          style={{ backgroundImage: `url(${lesson?.thumbnail || '/course-thumbnail.jpg'})` }}
        >
          {!videoState.isPlaying && (
            <div className="play-overlay" onClick={togglePlay}>
              <div className="play-button">
                <FaPlay />
              </div>
            </div>
          )}
        </div>
        {renderVideoControls()}
      </div>
    </div>
  );
};

export default CourseVideo;
