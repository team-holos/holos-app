import React, { useState } from "react";

function MoodForm({ onMoodChange }) {
  const [mood, setMood] = useState("Erholt");

  const handleChange = (event) => {
    setMood(event.target.value);
    onMoodChange(event.target.value);
  };

  return (
    <form>
      <label>Wähle aus, wie Du Dich fühlst:</label>
      <select value={mood} onChange={handleChange} className="m-4 border rounded bg-[#FFF2F2]">
        <option value="Erholt">Erholt</option>
        <option value="Energie">Voller Energie</option>
        <option value="Müde">Müde</option>
        <option value="Erschöpft">Noch erschöpft</option>
      </select>
    </form>
  );
}

export default MoodForm;