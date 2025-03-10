import React from "react";

const DailyNutritionProgress = ({ meals }) => {
  const dailyGoals = {
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 80,
  };

  const total = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const getProgressColor = (value, goal) =>
    value > goal ? "bg-red-500" : "bg-green-500";

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-2">Täglicher Fortschritt</h2>

      {Object.keys(dailyGoals).map((key) => (
        <div key={key} className="mb-3">
          <p className="text-sm font-medium">
            {key === "calories" && "Kalorien"} 
            {key === "protein" && "Protein (g)"} 
            {key === "carbs" && "Kohlenhydrate (g)"} 
            {key === "fats" && "Fette (g)"}: {total[key]} / {dailyGoals[key]}
          </p>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className={`h-4 rounded ${getProgressColor(
                total[key],
                dailyGoals[key]
              )}`}
              style={{
                width: `${Math.min(
                  (total[key] / dailyGoals[key]) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyNutritionProgress;
