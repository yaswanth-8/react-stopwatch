import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, isPaused]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(false);
    } else {
      setIsRunning(true);
    }
  };

  const handlePauseResume = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  const handleReset = () => {
    setTime(0);
  };

  return (
    <div className="container">
      <h1>{formatTime(time)}</h1>
      <button
        className={isRunning ? "stopButton" : "startButton"}
        onClick={handleStartStop}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      {isRunning && (
        <button
          className={isPaused ? "startButton" : "stopButton"}
          onClick={handlePauseResume}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      )}
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default App;
