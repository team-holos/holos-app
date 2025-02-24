import React, { useState } from 'react';

function SleepQualityForm({ onQualityChange }) {
  const [sleepQuality, setSleepQuality] = useState('durchgeschlafen');

  const handleChange = (event) => {
    setSleepQuality(event.target.value);
    onQualityChange(event.target.value);
  };

  return (
    <form>
      <label>Wie war Deine Schlafqualität:</label>
      <select value={sleepQuality} onChange={handleChange} className="m-4 border rounded bg-[#FFF2F2]">
        <option value="durchgeschlafen">durchgeschlafen</option>
        <option value="unruhig">unruhig</option>
        <option value="oft aufgewacht">oft aufgewacht</option>
      </select>
    </form>
  );
}

export default SleepQualityForm;