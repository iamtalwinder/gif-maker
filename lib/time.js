const time = {
  toHHMMSS: (seconds) => {
    return {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: Math.floor((seconds % 3600) % 60),
    };
  },

  toSeconds: (time) => {
    return time.hours * 36000 + time.minutes * 60 + time.seconds;
  },
};

export default time;
