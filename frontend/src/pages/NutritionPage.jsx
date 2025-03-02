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
  
      if (!response.ok) throw new Error("Fehler beim Laden der Mahlzeiten");
  
      const data = await response.json();
      setMeals(data);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Laden der Mahlzeiten");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const addMeal = async () => {
    if (
      !meal.name ||
      !meal.calories ||
      !meal.protein ||
      !meal.carbs ||
      !meal.fats
    ) {
      setError("Bitte alle Felder ausfüllen");
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

      if (!response.ok) throw new Error("Fehler beim Hinzufügen der Mahlzeit");

      fetchMeals();
      setMeal({ name: "", calories: "", protein: "", carbs: "", fats: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Hinzufügen der Mahlzeit");
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
      setError("Fehler beim Löschen der Mahlzeit");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Ernährungstracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Mahlzeit eintragen</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              className="p-2 border rounded"
              type="text"
              name="name"
              placeholder="Mahlzeitenname"
              value={meal.name}
              onChange={handleInputChange}
            />
            <input
              className="p-2 border rounded"
              type="number"
              name="calories"
              placeholder="Kalorien"
              value={meal.calories}
              onChange={handleInputChange}
            />
            <input
              className="p-2 border rounded"
              type="number"
              name="protein"
              placeholder="Protein (g)"
              value={meal.protein}
              onChange={handleInputChange}
            />
            <input
              className="p-2 border rounded"
              type="number"
              name="carbs"
              placeholder="Kohlenhydrate (g)"
              value={meal.carbs}
              onChange={handleInputChange}
            />
            <input
              className="p-2 border rounded col-span-2"
              type="number"
              name="fats"
              placeholder="Fette (g)"
              value={meal.fats}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={addMeal}
          >
            Mahlzeit hinzufügen
          </button>
        </div>

        <DailyNutritionProgress meals={meals} />
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-2">Eingetragene Mahlzeiten</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Mahlzeit</th>
              <th className="p-2 border">Kalorien</th>
              <th className="p-2 border">Protein (g)</th>
              <th className="p-2 border">Kohlenhydrate (g)</th>
              <th className="p-2 border">Fette (g)</th>
              <th className="p-2 border">Aktionen</th>
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
                  <button
                    className="text-red-500"
                    onClick={() => deleteMeal(meal.id)}
                  >
                    Löschen
                  </button>
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
