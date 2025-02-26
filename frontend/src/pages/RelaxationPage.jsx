import React, { useState, useRef } from "react";

function RelaxationPage() {
  const daytimeForrestBonfireAudio = useRef(null);
  const thunderWithBirdsAndFliesAudio = useRef(null);
  const waterLappingWind1Audio = useRef(null);
  const waterRunningByAudio = useRef(null);
  const windQuietCreaksAudio = useRef(null);

  const [daytimeForrestPlaying, setDaytimeForrestPlaying] = useState(false);
  const [thunderBirdsPlaying, setThunderBirdsPlaying] = useState(false);
  const [waterLappingPlaying, setWaterLappingPlaying] = useState(false);
  const [waterRunningPlaying, setWaterRunningPlaying] = useState(false);
  const [windQuietPlaying, setWindQuietPlaying] = useState(false);

  const [daytimeForrestVolume, setDaytimeForrestVolume] = useState(0.5);
  const [thunderBirdsVolume, setThunderBirdsVolume] = useState(0.5);
  const [waterLappingVolume, setWaterLappingVolume] = useState(0.5);
  const [waterRunningVolume, setWaterRunningVolume] = useState(0.5);
  const [windQuietVolume, setWindQuietVolume] = useState(0.5);

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

    const cycleMinutes = 60; // Typical sleep cycle duration without REM
    const numCycles = Math.floor(totalSleepMinutes / cycleMinutes);

    let currentTime = fallAsleepMinutes;
    const phases = [];

    for (let i = 0; i < numCycles; i++) {
      // Leichtschlafphase
      phases.push({
        start: minutesToTime(currentTime),
        end: minutesToTime(currentTime + 30),
        type: "Leichtschlaf",
      });
      currentTime += 30;

      // Tiefschlafphase
      phases.push({
        start: minutesToTime(currentTime),
        end: minutesToTime(currentTime + 30),
        type: "Tiefschlaf",
      });
      currentTime += 30;
    }

    // Aufwachphase
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

  const playSound = (audioRef, setPlaying, volume) => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
      if (volume !== undefined) {
        audioRef.current.volume = volume;
      }
    }
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
        <div className="relative px-4 py-10 bg-[#E8E8E8] shadow-lg sm:rounded-3xl sm:p-10 mt-8">
          <h2 className="text-2xl font-semibold text-center text-[#2D336B] mb-8">
            Natursounds
          </h2>
          <div className="mt-4">
            <button
              onClick={() => playSound(daytimeForrestBonfireAudio, setDaytimeForrestPlaying, daytimeForrestVolume)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]"
            >
              {daytimeForrestPlaying ? "Stop Daytime Forrest Bonfire" : "Play Daytime Forrest Bonfire"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={daytimeForrestVolume}
              onChange={(e) => setDaytimeForrestVolume(parseFloat(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={() => playSound(thunderWithBirdsAndFliesAudio, setThunderBirdsPlaying, thunderBirdsVolume)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7] mt-4"
            >
              {thunderBirdsPlaying ? "Stop Thunder with Birds and Flies" : "Play Thunder with Birds and Flies"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={thunderBirdsVolume}
              onChange={(e) => setThunderBirdsVolume(parseFloat(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={() => playSound(waterLappingWind1Audio, setWaterLappingPlaying, waterLappingVolume)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7] mt-4"
            >
              {waterLappingPlaying ? "Stop Water Lapping Wind" : "Play Water Lapping Wind"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={waterLappingVolume}
              onChange={(e) => setWaterLappingVolume(parseFloat(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={() => playSound(waterRunningByAudio, setWaterRunningPlaying, waterRunningVolume)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7] mt-4"
            >
              {waterRunningPlaying ? "Stop Water Running By" : "Play Water Running By"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={waterRunningVolume}
              onChange={(e) => setWaterRunningVolume(parseFloat(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={() => playSound(windQuietCreaksAudio, setWindQuietPlaying, windQuietVolume)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7] mt-4"
            >
              {windQuietPlaying ? "Stop Wind Quiet Creaks" : "Play Wind Quiet Creaks"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={windQuietVolume}
              onChange={(e) => setWindQuietVolume(parseFloat(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </div>
      </div>
      <audio ref={daytimeForrestBonfireAudio} src="/audio/DaytimeForrestBonfire.mp3" loop />
      <audio ref={thunderWithBirdsAndFliesAudio} src="/audio/ThunderwithBirdsandFlies.mp3" loop />
      <audio ref={waterLappingWind1Audio} src="/audio/WaterLappingWind (1).mp3" loop />
      <audio ref={waterRunningByAudio} src="/audio/WaterRunningBy.mp3" loop />
      <audio ref={windQuietCreaksAudio} src="/audio/WindQuietCreaks.mp3" loop />
    </div>
  );
}

export default RelaxationPage;