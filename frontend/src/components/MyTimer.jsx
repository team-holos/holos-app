import { useTimer } from "react-timer-hook";
import  useSound  from "use-sound";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";


function MyTimer({ expiryTimestamp }) {
  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    // onExpire: () => console.warn("onExpire called"),
    onExpire: () => playExpireSound(), // Play sound on expire
  });

  const gong = "./sounds/gong.mp3"; // Sound file
  const [playExpireSound] = useSound(gong); // Initialize sound
  const [setTime] = useState(new Date()); // State for current time

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(new Date()); // Update the time every second
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clear interval on unmount or isRunning change
  }, [isRunning]);

  const handleRestart = (durationInSeconds) => {
    const newExpiryTimestamp = new Date();
    newExpiryTimestamp.setSeconds(
      newExpiryTimestamp.getSeconds() + durationInSeconds
    );
    restart(newExpiryTimestamp);
  };

  const handleStart = () => {
    start();
    playExpireSound();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>Meditations - Timer</p>
      <div style={{ fontSize: "45px" }}>
        {/* <span>{days}</span>: */} 
        {/* <span>{hours}</span>: */}
        <span>{minutes}</span>:  
        {/**/}
        <span>{seconds}</span>
      </div>
      <p className="text-xs">{isRunning ? "Timer läuft" : "Timer aus"}</p>
      <div></div>
      <div className="text-[#FFF2F2] text-xs">
        <button onClick={handleStart} className="p-2 border rounded  text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]">
          Start
        </button>
        <button onClick={pause} className="p-2 border rounded m-2  text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]">
          Pause
        </button>
        <button onClick={resume} className="p-2 border rounded  text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]">
          Weiter
        </button>
        <button
          onClick={() => {
            // Restarts to 5 minutes timer
            // const time = new Date();
            // time.setSeconds(time.getSeconds() + 300);
            // restart(time);
            handleRestart(300)
          }}
          className="p-2 border rounded m-2  text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]"
        // className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]"
        >
          Neustart
        </button>
      </div>
    </div>
  );
}

MyTimer.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date).isRequired,
};


export default MyTimer;