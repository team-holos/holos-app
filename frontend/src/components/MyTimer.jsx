import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <p>Meditations - Timer</p>
      <div style={{ fontSize: "50px" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p className="text-xs">{isRunning ? "Running" : "Not running"}</p>
      <div>
        
      </div>
      <div className="text-[#FFF2F2] text-xs">
      <button onClick={start} className="p-2 border rounded bg-[#2D336B]">Start</button>
      <button onClick={pause} className="p-2 border rounded m-2 bg-[#2D336B]">Pause</button>
      <button onClick={resume} className="p-2 border rounded bg-[#2D336B]">Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      className="p-2 border rounded m-2 bg-[#2D336B]">
        Restart
      </button>
      </div>
    </div>
  );
}

export default MyTimer;
