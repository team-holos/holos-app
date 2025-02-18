import React from 'react';

function LevelFilter() {
  return (
    <div>
      <label htmlFor="level">Level:</label>
      <select id="level">
        <option value="all">Alle</option>
        <option value="beginner">Anfänger</option>
        <option value="intermediate">Fortgeschritten</option>
        <option value="advanced">Profi</option>
      </select>
    </div>
  );
}

export default LevelFilter;