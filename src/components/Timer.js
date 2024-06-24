import { useEffect } from "react";

function toTime(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

function Timer({ dispatch, timeRemaining }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRemaining <= 0) dispatch({ type: "finish" });
      else dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, timeRemaining]);

  return <div className="timer">{toTime(timeRemaining)}</div>;
}

export default Timer;
