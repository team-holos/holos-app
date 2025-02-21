import React from "react";

function GoalFilter({ currentGoal, onChange }) {
  const goals = [
    "Muskelaufbau",
    "Gewichtsverlust",
    "Fettabbau",
    "Ausdauertraining",
    "Allgemeine Fitness",
  ];

  return (
    <div className="mb-4">
      <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
        Ziel:
      </label>
      <select
        id="goal"
        value={currentGoal} // Wichtig: Aktuelles Ziel anzeigen
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 sm:text-sm"
      >
        <option value="Alle">Alle</option>
        {goals.map((goal) => (
          <option key={goal} value={goal}>
            {goal}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GoalFilter;