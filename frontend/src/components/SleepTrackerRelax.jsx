import React, { useState, useEffect } from "react";

const SleepTracker = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [sleepData, setSleepData] = useState(null);

  const startSleep = () => {
    setStartTime(new Date());
  };

  const endSleep = () => {
    setEndTime(new Date());
  };

  useEffect(() => {
    if (startTime && endTime) {
      calculateSleepData();
    }
  }, [startTime, endTime]);

  const calculateSleepData = () => {
    const duration = endTime - startTime;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    
    const quality = Math.random() * 100;
    const wakePhase = Math.random() * 30;

    setSleepData({
      duration: `${hours}h ${minutes}m`,
      quality: quality.toFixed(2),
      wakePhase: wakePhase.toFixed(2),
    });
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Schlaf-Tracker</h2>
      {!startTime ? (
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded" 
        >
          Schlafen gehen
        </button>
      ) : !endTime ? (
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded" 
          onClick={endSleep}
        >
          Aufwachen
        </button>
      ) : (
        sleepData && (
          <div>
            <p>Schlafdauer: {sleepData.duration}</p>
            <p>Schlafqualität: {sleepData.quality}%</p>
            <p>Aufwachphase: {sleepData.wakePhase} min</p>
          </div>
        )
      )}
    </div>
  );
};

export default SleepTracker;