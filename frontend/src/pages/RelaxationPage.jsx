import React, { useState } from "react";

function RelaxationPage() {
  const [inputs, setInputs] = useState({
    fallAsleep: "",
    wakeup: "",
    sleepQuality: "",
    mood: "",
  });
  const [sleepPhases, setSleepPhases] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Eingaben:", inputs);
    const phases = generateSleepPhases(inputs.fallAsleep, inputs.wakeup);
    setSleepPhases(phases);
    console.log("Schlafphasen:", phases);
  };

  const generateSleepPhases = (fallAsleep, wakeup) => {
    if (!fallAsleep || !wakeup) return [];

    const fallAsleepMinutes = timeToMinutes(fallAsleep);
    const wakeupMinutes = timeToMinutes(wakeup);
    let totalSleepMinutes = wakeupMinutes - fallAsleepMinutes;
    if (totalSleepMinutes < 0) totalSleepMinutes += 24 * 60;

    const leichtschlafMinutes = Math.round(totalSleepMinutes * 0.5);
    const tiefschlafMinutes = Math.round(totalSleepMinutes * 0.2);
    const remMinutes = Math.round(totalSleepMinutes * 0.3);

    let currentTime = fallAsleepMinutes;
    const phases = [];

    phases.push({
      start: minutesToTime(currentTime),
      end: minutesToTime(currentTime + Math.round(leichtschlafMinutes / 2)),
      type: "Leichtschlaf",
    });
    currentTime += Math.round(leichtschlafMinutes / 2);

    phases.push({
      start: minutesToTime(currentTime),
      end: minutesToTime(currentTime + tiefschlafMinutes),
      type: "Tiefschlaf",
    });
    currentTime += tiefschlafMinutes;

    phases.push({
      start: minutesToTime(currentTime),
      end: minutesToTime(currentTime + remMinutes),
      type: "REM-Schlaf",
    });
    currentTime += remMinutes;

    phases.push({
      start: minutesToTime(currentTime),
      end: wakeup,
      type: "Leichtschlaf",
    });

    return phases;
  };

  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours < 10 ? "0" : hours}:${mins < 10 ? "0" : mins}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {/* ... (vorhandener Code) */}
      <div className="relative px-4 py-10 bg-[#E8E8E8] shadow-lg sm:rounded-3xl sm:p-20">
        {/* ... (vorhandener Code) */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (vorhandener Code) */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]"
            >
              Daten speichern
            </button>
          </div>
        </form>
        {sleepPhases.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-4">
              Schlafphasen
            </h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Phase</th>
                  <th className="text-left">Start</th>
                  <th className="text-left">Ende</th>
                </tr>
              </thead>
              <tbody>
                {sleepPhases.map((phase, index) => (
                  <tr key={index}>
                    <td>{phase.type}</td>
                    <td>{phase.start}</td>
                    <td>{phase.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RelaxationPage;