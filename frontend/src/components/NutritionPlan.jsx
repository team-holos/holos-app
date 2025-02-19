import React from "react";

function NutritionPlan({ plan }) {
  if (!plan || !plan.meals) {
    return <div>Kein Ernährungsplan ausgewählt oder Daten fehlen.</div>;
  }

  let meals = plan.meals;

  if (typeof meals === "string") {
    try {
      meals = JSON.parse(meals);
    } catch (error) {
      console.error("Error parsing meals JSON:", error);
      return <div>Fehler beim Laden der Mahlzeiten.</div>;
    }
  }

  return (
    <div className="border p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
      <p className="text-gray-600 mb-4">{plan.description}</p>
      <ul className="list-disc pl-5">
        {meals.map((meal, index) => (
          <li key={index} className="text-gray-800">
            {meal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NutritionPlan;
