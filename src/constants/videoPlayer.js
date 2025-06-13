// Video Player Constants
export const VIDEO_PLAYER = {
  DEFAULT_VOLUME: 80,
  DEFAULT_PLAYBACK_RATE: 1,
  DEFAULT_PROGRESS: 0,
  PLAYBACK_RATES: [0.5, 0.75, 1, 1.25, 1.5, 2],
  VOLUME_MIN: 0,
  VOLUME_MAX: 100,
  PROGRESS_MIN: 0,
  PROGRESS_MAX: 100,
  CONTROLS_TIMEOUT: 3000, // Time in ms before controls hide
};

// Video Player States
export const VIDEO_STATES = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  LOADING: 'loading',
  ERROR: 'error',
};

// Video Player Events
export const VIDEO_EVENTS = {
  PLAY: 'play',
  PAUSE: 'pause',
  VOLUME_CHANGE: 'volumechange',
  PROGRESS: 'progress',
  RATE_CHANGE: 'ratechange',
};

// Video Player Messages
export const VIDEO_MESSAGES = {
  ERROR_LOADING: 'Error loading video',
  LOADING: 'Loading video...',
}; 