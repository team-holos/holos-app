import React, { useState } from 'react';

function SleepTracker() {
    const [sleepTime, setSleepTime] = useState('');
    const [wakeTime, setWakeTime] = useState('');
    const [sleepDurationHours, setSleepDurationHours] = useState(0);
    const [sleepDurationMinutes, setSleepDurationMinutes] = useState(0);


    const calculateSleepDuration = () => {
        const sleepTimeMinutes = parseInt(sleepTime.slice(0, 2)) * 60 + parseInt(sleepTime.slice(3, 5));
        const wakeTimeMinutes = parseInt(wakeTime.slice(0, 2)) * 60 + parseInt(wakeTime.slice(3, 5));

        let totalSleepMinutes = wakeTimeMinutes - sleepTimeMinutes;
        if (totalSleepMinutes < 0) {
            totalSleepMinutes += 1440; // 24 Stunden in Minuten
        }

        const hours = Math.floor(totalSleepMinutes / 60);
        const minutes = totalSleepMinutes % 60;

        setSleepDurationHours(hours);
        setSleepDurationMinutes(minutes);
    };

    return (
        <div>
            <h2>Schlaf Tracker</h2>
            <label htmlFor="sleepTime">Schlafenszeit:</label>
            <input
                type="time"
                id="sleepTime"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
            />
            <label htmlFor="wakeTime">Aufwachzeit:</label>
            <input
                type="time"
                id="wakeTime"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
            />
            <button onClick={calculateSleepDuration}>Berechne Schlafdauer</button>
        </div>
    );
}

export default SleepTracker;