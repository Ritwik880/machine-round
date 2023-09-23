import React, { useState, useEffect } from 'react';

const Timer = () => {

  const [timers, setTimers] = useState([]);
  const [nextTimerId, setNextTimerId] = useState(1)

  const addTimer = () => {
    const newTimer = { id: nextTimerId, minutes: 0, seconds: 0, isRunning: false };
    setTimers([...timers, newTimer]);
    setNextTimerId(nextTimerId + 1);
  }
  const startTimer = (id) => {
    const updateTimer = timers.map((timer) => timer.id === id ? { ...timer, isRunning: true } : timer);
    setTimers(updateTimer);
    console.log('Timer Start Success');

  }
  const stopTimer = (id) => {
    const updateTimer = timers.map((timer) => timer.id === id ? { ...timer, isRunning: false } : timer);
    setTimers(updateTimer);
    console.log('Timer Stopped Success');
  }

  const resetTimer = (id) => {
    const updateTimer = timers.map((timer) => timer.id === id ? { ...timer, minutes: 0, seconds: 0, isRunning: false } : timer);
    setTimers(updateTimer);
    console.log('Timer Reset Success');
  }

  const deleteTimer = (id) => {
    const updateTimer = timers.filter((timer) => timer.id !== id);
    setTimers(updateTimer)
  }


  useEffect(() => {
    const interval = setInterval(() => {

      const updatedTimer = timers.map((timer) => timer.isRunning ? timer.seconds === 59 ? { ...timer, seconds: 0, minutes: timer.minutes + 1 } : { ...timer, seconds: timer.seconds + 1 } : timer)
      setTimers(updatedTimer);
    }, 1000);


    return () => clearInterval(interval)
  }, [timers])

  return (
    <div>
      <div>
        <button onClick={addTimer}>Add A Timer</button>
      </div>

      {
        timers.map((timer, index) => {
          return (
            <div key={index}>
              <p>
                Timer {timer.id} : {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes} : {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
              </p>
              <button onClick={() => startTimer(timer.id)}>Start Timer</button>
              <button onClick={() => stopTimer(timer.id)}>End Timer</button>
              <button onClick={() => resetTimer(timer.id)}>Reset Timer</button>
              <button onClick={() => deleteTimer(timer.id)}>Delete Timer</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Timer