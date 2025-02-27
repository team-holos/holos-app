import React, { useState } from "react";

const AlarmClock = () => {
  const [alarmTime, setAlarmTime] = useState('');

  const setAlarm = () => {
    
    alert(`Alarm gesetzt für ${alarmTime}`);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Wecker</h2>
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
        className="border rounded p-2"
      />
      <button
        className="bg-primary text-white py-2 px-4 rounded ml-2"
        onClick={setAlarm}
      >
        Alarm stellen
      </button>
    </div>
  );
};

export default AlarmClock;