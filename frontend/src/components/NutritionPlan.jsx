import React from "react";

const NutritionPlan = ({ plan }) => {
  if (!plan || plan.length === 0) {
    return <p className="text-center text-red-500 mt-4">Keine Ernährungspläne verfügbar.</p>;
  }

  return (
    <div className="mt-5 max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Dein Ernährungsplan</h2>
      <ul className="space-y-4">
        {plan.map((item) => (
          <li key={item.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <strong className="block text-lg text-gray-900">{item.name}</strong>
            <p className="text-gray-600">{item.description}</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {Array.isArray(item.meals)
                ? item.meals.map((meal, index) => <li key={index}>{meal}</li>)
                : JSON.parse(item.meals).map((meal, index) => <li key={index}>{meal}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionPlan;



