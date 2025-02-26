import React, { useState, useEffect } from "react";
import DailyNutritionProgress from "../components/DailyNutritionProgress";

function NutritionPage() {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/nutrition/plan", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch meals");

      const data = await response.json();
      setMeals(data);
    } catch (err) {
      console.error(err);
      setError("Error loading meals");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const addMeal = async () => {
    if (!meal.name || !meal.calories || !meal.protein || !meal.carbs || !meal.fats) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/nutrition/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: meal.name.trim(),
          calories: parseInt(meal.calories, 10),
          protein: parseInt(meal.protein, 10),
          carbs: parseInt(meal.carbs, 10),
          fats: parseInt(meal.fats, 10),
        }),
      });

      if (!response.ok) throw new Error("Failed to add meal");

      fetchMeals();
      setMeal({ name: "", calories: "", protein: "", carbs: "", fats: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error adding meal");
    }
  };

  const deleteMeal = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/nutrition/plan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchMeals();
    } catch (err) {
      console.error(err);
      setError("Error deleting meal");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Nutrition Tracker</h1>

      <DailyNutritionProgress meals={meals} />

      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Log Your Meal</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="p-2 border rounded" type="text" name="name" placeholder="Meal Name" value={meal.name} onChange={handleInputChange} />
          <input className="p-2 border rounded" type="number" name="calories" placeholder="Calories" value={meal.calories} onChange={handleInputChange} />
          <input className="p-2 border rounded" type="number" name="protein" placeholder="Protein (g)" value={meal.protein} onChange={handleInputChange} />
          <input className="p-2 border rounded" type="number" name="carbs" placeholder="Carbs (g)" value={meal.carbs} onChange={handleInputChange} />
          <input className="p-2 border rounded" type="number" name="fats" placeholder="Fats (g)" value={meal.fats} onChange={handleInputChange} />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addMeal}>Add Meal</button>
      </div>

      {loading && <p>Loading meals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Logged Meals</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Meal</th>
              <th className="p-2 border">Calories</th>
              <th className="p-2 border">Protein (g)</th>
              <th className="p-2 border">Carbs (g)</th>
              <th className="p-2 border">Fats (g)</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id} className="border">
                <td className="p-2 border">{meal.name}</td>
                <td className="p-2 border">{meal.calories}</td>
                <td className="p-2 border">{meal.protein}</td>
                <td className="p-2 border">{meal.carbs}</td>
                <td className="p-2 border">{meal.fats}</td>
                <td className="p-2 border">
                  <button className="text-red-500" onClick={() => deleteMeal(meal.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NutritionPage;
