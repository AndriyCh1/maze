import { useState } from "react";

export const useTimer = () => {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [timePassed, setTimePassed] = useState(0);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimePassed((prevTime) => prevTime + 1);
    }, 1000);

    setTimer(intervalId);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  return {
    timePassed,
    startTimer,
    stopTimer,
  };
};
