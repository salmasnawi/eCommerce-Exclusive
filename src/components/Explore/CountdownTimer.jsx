import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Set the initial time (3 hours, 23 minutes, 19 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 23,
    seconds: 19,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        // Update the timer
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval); // Stop the timer when it reaches 0
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Format the time to always show 2 digits (e.g., 03:23:19)
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="countdown-timer">
      {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
    </div>
  );
};

export default CountdownTimer;