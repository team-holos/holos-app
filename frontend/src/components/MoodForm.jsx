import React, { useState } from 'react';
import SleepQualityForm from '../components/SleepQualityForm';
import MoodForm from '../components/MoodForm';
import SleepPhasesChart from '../components/SleepPhasesChart';

function RelaxationPage() {
  const [inputs, setInputs] = useState({ fallAsleep: '', wakeup: '' });
  const [sleepPhases, setSleepPhases] = useState([]);
  const [sleepQuality, setSleepQuality] = useState('');
  const [mood, setMood] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSleepQualityChange = (quality) => {
    setSleepQuality(quality);
  };

  const handleMoodChange = (moodValue) => {
    setMood(moodValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const generatedSleepPhases = generateSleepPhases(inputs.fallAsleep, inputs.wakeup);
    setSleepPhases(generatedSleepPhases);
    console.log(inputs, sleepQuality, mood);
  };

  const generateSleepPhases = (fallAsleep, wakeup) => {
   
    const phases = [];
    let currentTime = parseInt(fallAsleep);
    const endTime = parseInt(wakeup);
    const totalSleepTime = endTime - currentTime;
    const leichtschlafTime = totalSleepTime * 0.5;
    const tiefschlafTime = totalSleepTime * 0.2;
    const remTime = totalSleepTime * 0.3;

    phases.push({ start: `${currentTime}:00`, end: `${currentTime + leichtschlafTime / 2}:00`, type: 'Leichtschlaf' });
    currentTime += leichtschlafTime / 2;
    phases.push({ start: `${currentTime}:00`, end: `${currentTime + tiefschlafTime}:00`, type: 'Tiefschlaf' });
    currentTime += tiefschlafTime;
    phases.push({ start: `${currentTime}:00`, end: `${currentTime + remTime}:00`, type: 'REM-Schlaf' });
    currentTime += remTime;
    phases.push({ start: `${currentTime}:00`, end: `${endTime}:00`, type: 'Leichtschlaf' });

    return phases;
  };

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-2">Erholung</h1>
      <h3 className="font-bold">Schlafanalyse-Dashboard</h3>
      <form onSubmit={handleSubmit} className="p-2 my-2 flex flex-col">
        <label>
          Einschlafzeit:
          <input type="number" name="fallAsleep" value={inputs.fallAsleep || ''} onChange={handleChange} className="border rounded m-4 p-1" /> Uhr
        </label>
        <label>
          Aufwachzeit:
          <input type="number" name="wakeup" value={inputs.wakeup || ''} onChange={handleChange} className="border rounded m-4 p-1" /> Uhr
        </label>
      </form>
      <div className="p-2 my-4">
        <SleepQualityForm onQualityChange={handleSleepQualityChange} />
        <MoodForm onMoodChange={handleMoodChange} />
        <button onClick={handleSubmit}>
          <input type="submit" className="p-2 my-2 mt-10 border rounded cursor-pointer" />
        </button>
      </div>
      {sleepPhases.length > 0 && <SleepPhasesChart sleepPhases={sleepPhases} />}
    </div>
  );
}

export default RelaxationPage;