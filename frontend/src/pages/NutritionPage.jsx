import React, { useState, useEffect } from "react";

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
    if (
      !meal.name ||
      !meal.calories ||
      !meal.protein ||
      !meal.carbs ||
      !meal.fats
    ) {
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Nutrition Tracker</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Meal Name"
          value={meal.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={meal.calories}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="protein"
          placeholder="Protein (g)"
          value={meal.protein}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="carbs"
          placeholder="Carbs (g)"
          value={meal.carbs}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="fats"
          placeholder="Fats (g)"
          value={meal.fats}
          onChange={handleInputChange}
        />
        <button onClick={addMeal}>Add Meal</button>
      </div>

      {loading && <p>Loading meals...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" style={{ margin: "auto", width: "80%" }}>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fats (g)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.name}</td>
              <td>{meal.calories}</td>
              <td>{meal.protein}</td>
              <td>{meal.carbs}</td>
              <td>{meal.fats}</td>
              <td>
                <button onClick={() => deleteMeal(meal.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NutritionPage;
