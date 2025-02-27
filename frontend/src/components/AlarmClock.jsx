import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import SoundPlayer from "./SoundPlayer";
import alarmSound from "/sounds/DaytimeForrestBonfire.mp3";

const AlarmClock = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmInterval, setAlarmInterval] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [playAlarmSound] = useSound(alarmSound);

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
            playAlarmSound();
            alert("Wecker!");
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
      <div className="flex flex-col">
        <input
          type="time"
          value={alarmTime}
          onChange={handleAlarmTimeChange}
          className="border rounded p-2 mb-2"
        />
        {alarmActive ? (
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded" 
            onClick={handleCancelAlarm}
          >
            Alarm abbrechen
          </button>
        ) : (
          <button
            className="bg-[#7886C7] text-white py-2 px-4 rounded"
            onClick={handleSetAlarm}
          >
            Alarm stellen
          </button>
        )}
      </div>
    </div>
  );
};

export default AlarmClock;