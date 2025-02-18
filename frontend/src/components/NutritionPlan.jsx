import React from "react";

function NutritionPlan({ plan }) {
  if (!plan || !plan.days) {
    return <div>Kein Ernährungsplan ausgewählt oder Daten fehlen.</div>;
  }

  return (
    <div className='border'>
      {plan.days.map((day, dayIndex) => (
        <div key={dayIndex}>
          <h2>{day.day}</h2>
          <ul>
            {day.meals.map((meal, mealIndex) => (
              <li key={mealIndex}>
                <strong>{meal.name}</strong>: {meal.ingredients.join(", ")} ({meal.calories} kcal)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default NutritionPlan;


