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
        <div className="bg-white rounded-lg shadow p-4 border border-gray-300"> {/* Umrandung */}
            <h2 className="text-lg font-medium mb-2">Schlaf Tracker</h2> {/* Überschrift */}
            <div className="mb-4"> {/* Abstand für Eingabefelder */}
                <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700">Schlafenszeit:</label>
                <input
                    type="time"
                    id="sleepTime"
                    value={sleepTime}
                    onChange={(e) => {
                        setSleepTime(e.target.value);
                        calculateSleepDuration();
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full" /* Styling für Eingabefeld */
                />
            </div>
            <div>
                <label htmlFor="wakeTime" className="block text-sm font-medium text-gray-700">Aufwachzeit:</label>
                <input
                    type="time"
                    id="wakeTime"
                    value={wakeTime}
                    onChange={(e) => {
                        setWakeTime(e.target.value);
                        calculateSleepDuration();
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full" /* Styling für Eingabefeld */
                />
            </div>
            <button 
                onClick={calculateSleepDuration} 
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Berechne Schlafdauer
            </button>
            <div className="mt-4">
                <span className="font-medium">Schlafdauer:</span>
                <span className="ml-2">{sleepDurationHours} Stunden und {sleepDurationMinutes} Minuten</span>
            </div>
        </div>
    );
}

export default SleepTracker;