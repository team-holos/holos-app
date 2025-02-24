import React from "react";

function LevelFilter({ exercisesData, onChange }) {
  const levels = [...new Set(exercisesData.map(exercise => exercise.level))];

  return (
    <div className="mb-4">
      <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level:</label>
      <select
        id="level"
        onChange={e => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 sm:text-sm"
      >
        <option value="Alle">Alle</option>
        {levels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>
  );
}

export default LevelFilter;