import React, { useState } from "react";

function RelaxationPage() {
  const [inputs, setInputs] = useState({
    fallAsleep: "",
    wakeup: "",
    sleepQuality: "",
    mood: "",
  });
  const [sleepPhases, setSleepPhases] = useState([]);
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmSet, setAlarmSet] = useState(false);

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

    let fallAsleepMinutes = timeToMinutes(fallAsleep);
    let wakeupMinutes = timeToMinutes(wakeup);
    let totalSleepMinutes = wakeupMinutes - fallAsleepMinutes;
    if (totalSleepMinutes < 0) totalSleepMinutes += 24 * 60;

    const leichtschlafMinutes = Math.round(totalSleepMinutes * 0.45); // Reduziert Leichtschlaf, um Platz für REM zu schaffen
    const tiefschlafMinutes = Math.round(totalSleepMinutes * 0.3);
    const remMinutes = Math.round(totalSleepMinutes * 0.25); // REM-Phase

    let currentTime = fallAsleepMinutes;
    const phases = [];

    phases.push({
      start: minutesToTime(currentTime),
      end: minutesToTime(currentTime + Math.round(leichtschlafMinutes / 2)),
      type: "Einschlafphase",
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
      type: "REM-Phase",
    });
    currentTime += remMinutes;

    phases.push({
      start: minutesToTime(currentTime),
      end: wakeup,
      type: "Aufwachphase",
    });

    return phases;
  };

  const timeToMinutes = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  const handleAlarmChange = (event) => {
    setAlarmTime(event.target.value);
  };

  const setAlarm = () => {
    if (!alarmTime) return;

    const now = new Date();
    const alarmDate = new Date(now.toDateString() + " " + alarmTime);

    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }
    const timeUntilAlarm = alarmDate - now;

    setTimeout(() => {
      alert("Weckzeit!");
      setAlarmSet(false);
    }, timeUntilAlarm);

    setAlarmSet(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:flex-row justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A9B2D8] to-[#7886C7] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-[#E8E8E8] shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-center text-[#2D336B] mb-8">
            Erholung
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fallAsleep"
                className="block text-sm font-medium text-[#2D336B]"
              >
                Einschlafzeit
              </label>
              <input
                type="time"
                name="fallAsleep"
                id="fallAsleep"
                value={inputs.fallAsleep}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-[#A9B2D8] shadow-sm focus:border-[#7886C7] focus:ring focus:ring-[#A9B2D8] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="wakeup"
                className="block text-sm font-medium text-[#2D336B]"
              >
                Aufwachzeit
              </label>
              <input
                type="time"
                name="wakeup"
                id="wakeup"
                value={inputs.wakeup}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-[#A9B2D8] shadow-sm focus:border-[#7886C7] focus:ring focus:ring-[#A9B2D8] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="sleepQuality"
                className="block text-sm font-medium text-[#2D336B]"
              >
                Schlafqualität
              </label>
              <select
                name="sleepQuality"
                id="sleepQuality"
                value={inputs.sleepQuality}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-[#A9B2D8] shadow-sm focus:border-[#7886C7] focus:ring focus:ring-[#A9B2D8] focus:ring-opacity-50"
              >
                <option value="">Bitte wählen</option>
                <option value="gut">Gut</option>
                <option value="mittel">Mittel</option>
                <option value="schlecht">Schlecht</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="mood"
                className="block text-sm font-medium text-[#2D336B]"
              >
                Stimmung
              </label>
              <select
                name="mood"
                id="mood"
                value={inputs.mood}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-[#A9B2D8] shadow-sm focus:border-[#7886C7] focus:ring focus:ring-[#A9B2D8] focus:ring-opacity-50"
              >
                <option value="">Bitte wählen</option>
                <option value="gut">Gut</option>
                <option value="neutral">Neutral</option>
                <option value="schlecht">Schlecht</option>
              </select>
            </div>
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
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4">Phase</th>
                    <th className="text-left py-2 px-4">Start</th>
                    <th className="text-left py-2 px-4">Ende</th>
                  </tr>
                </thead>
                <tbody>
                  {sleepPhases.map((phase, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4">{phase.type}</td>
                      <td className="py-2 px-4">{phase.start}</td>
                      <td className="py-2 px-4">{phase.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="relative py-3 sm:max-w-xs sm:mx-auto mt-8 sm:mt-0 flex-1">
        <div className="relative px-4 py-10 bg-[#E8E8E8] shadow-lg sm:rounded-3xl sm:p-10">
          <h2 className="text-2xl font-semibold text-center text-[#2D336B] mb-8">
            Wecker
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="alarmTime"
                className="block text-sm font-medium text-[#2D336B]"
              >
                Weckzeit stellen
              </label>
              <input
                type="time"
                name="alarmTime"
                id="alarmTime"
                value={alarmTime}
                onChange={handleAlarmChange}
                className="mt-1 block w-full rounded-md border-[#A9B2D8] shadow-sm focus:border-[#7886C7] focus:ring focus:ring-[#A9B2D8] focus:ring-opacity-50"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={setAlarm}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]"
              >
                {alarmSet ? "Wecker gestellt" : "Wecker stellen"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelaxationPage;