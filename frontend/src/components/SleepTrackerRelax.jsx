import React, { useState, useEffect } from "react";

const SleepTrackerRelax = ({ onSleepDataSaved }) => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [sleepData, setSleepData] = useState(null);
    const [sleepQuality, setSleepQuality] = useState("");
    const [mood, setMood] = useState("");
    const [sleepHistory, setSleepHistory] = useState([]);
    const [averageSleepDuration, setAverageSleepDuration] = useState("");

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const calculateSleepData = () => {
        if (startTime && endTime) {
            const start = new Date(`2000-01-01T${startTime}`);
            const end = new Date(`2000-01-01T${endTime}`);
            let duration = end - start;

            if (duration < 0) {
                duration += 24 * 60 * 60 * 1000;
            }

            const hours = Math.floor(duration / (1000 * 60 * 60));
            const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

            const newSleepData = {
                startTime,
                endTime,
                duration: `${hours}h ${minutes}m`,
                sleepQuality,
                mood,
            };

            setSleepData(newSleepData);
            setSleepHistory([...sleepHistory, newSleepData]);
            calculateAverageSleepDuration([...sleepHistory, newSleepData]);

            if (onSleepDataSaved) {
                onSleepDataSaved(newSleepData);
            }
        }
    };

    const calculateAverageSleepDuration = (history) => {
        if (history.length > 0) {
            let totalDuration = 0;
            history.forEach((entry) => {
                const [hours, minutes] = entry.duration.split("h ").map((str) => parseInt(str));
                totalDuration += hours * 60 + minutes;
            });
            const averageMinutes = totalDuration / history.length;
            const avgHours = Math.floor(averageMinutes / 60);
            const avgMinutes = Math.round(averageMinutes % 60);
            setAverageSleepDuration(`${avgHours}h ${avgMinutes}m`);
        } else {
            setAverageSleepDuration("");
        }
    };

    const handleSleepQualityChange = (event) => {
        setSleepQuality(event.target.value);
    };

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    useEffect(() => {
        calculateAverageSleepDuration(sleepHistory);
    }, [sleepHistory]);

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-4">Schlaf-Tracker</h2>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    Einschlafzeit
                </label>
                <input
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    Aufwachzeit
                </label>
                <input
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    Schlafqualität
                </label>
                <select
                    value={sleepQuality}
                    onChange={handleSleepQualityChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Auswählen...</option>
                    <option value="sehr gut">Sehr gut</option>
                    <option value="gut">Gut</option>
                    <option value="mittel">Mittel</option>
                    <option value="schlecht">Schlecht</option>
                    <option value="sehr schlecht">Sehr schlecht</option>
                </select>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    Stimmung
                </label>
                <select
                    value={mood}
                    onChange={handleMoodChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Auswählen...</option>
                    <option value="sehr gut">Sehr gut</option>
                    <option value="gut">Gut</option>
                    <option value="neutral">Neutral</option>
                    <option value="schlecht">Schlecht</option>
                    <option value="sehr schlecht">Sehr schlecht</option>
                </select>
            </div>
            <button
                onClick={calculateSleepData}
                className="bg-[#7886C7] text-white py-2 px-4 rounded mt-4 hover:bg-[#5A69A7] transition duration-300"
            >
                Schlafdauer und Daten speichern
            </button>
            {sleepData && <p>Schlafdauer: {sleepData.duration}</p>}
            {sleepHistory.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Schlafhistorie</h3>
                    <ul>
                        {sleepHistory.map((entry, index) => (
                            <li key={index} className="border rounded p-2 mb-2">
                                Einschlafzeit: {entry.startTime}, Aufwachzeit: {entry.endTime}, Schlafdauer: {entry.duration}, Schlafqualität: {entry.sleepQuality}, Stimmung: {entry.mood}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {averageSleepDuration && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Durchschnittliche Schlafdauer</h3>
                    <p>{averageSleepDuration}</p>
                </div>
            )}
        </div>
    );
};

export default SleepTrackerRelax;