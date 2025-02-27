import React, { useState, useEffect } from "react";

const AlarmClock = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmInterval, setAlarmInterval] = useState(null);

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value);
  };

  const handleSetAlarm = () => {
    if (alarmTime) {
      const now = new Date();
      const alarm = new Date(now.toDateString() + " " + alarmTime);

      if (alarm > now) {
        setAlarmActive(true);
        const timeUntilAlarm = alarm - now;

        setAlarmInterval(
          setTimeout(() => {
            alert("Aufwachen!");
            setAlarmActive(false);
          }, timeUntilAlarm)
        );
      } else {
        alert("Bitte stelle deinen Wecker.");
      }
    }
  };

  const handleCancelAlarm = () => {
    if (alarmInterval) {
      clearTimeout(alarmInterval);
      setAlarmActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (alarmInterval) {
        clearTimeout(alarmInterval);
      }
    };
  }, [alarmInterval]);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Wecker</h2>
      <input
        type="time"
        value={alarmTime}
        onChange={handleAlarmTimeChange}
        className="border rounded p-2"
      />
      {alarmActive ? (
        <button
          className="bg-red-600 text-white py-2 px-4 rounded ml-2"
          onClick={handleCancelAlarm}
        >
          Alarm abbrechen
        </button>
      ) : (
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded ml-2"
          onClick={handleSetAlarm}
        >
          Alarm stellen
        </button>
      )}
    </div>
  );
};

export default AlarmClock;