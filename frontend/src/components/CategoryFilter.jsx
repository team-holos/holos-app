import React from "react";

function CategoryFilter({ onChange }) {
  const categories = [...new Set(exercisesData.map(exercise => exercise.category))];

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategorie:</label>
      <select
        id="category"
        onChange={e => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 sm:text-sm"
      >
        <option value="all">Alle</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;