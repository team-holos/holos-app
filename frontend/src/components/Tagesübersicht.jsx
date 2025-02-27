import React, { useState, useEffect } from "react";

function Tagesübersicht() {
  const [nutritionSummary, setNutritionSummary] = useState(null);
  const [workoutReminder, setWorkoutReminder] = useState(null);
  const [journalPrompt, setJournalPrompt] = useState("Wie fühlst du dich heute?");
  const [loadingNutrition, setLoadingNutrition] = useState(true);
  const [loadingWorkout, setLoadingWorkout] = useState(true);

  useEffect(() => {
    fetchNutritionSummary();
    fetchWorkoutReminder();
  }, []);

  // Fetch Nutrition Data
  const fetchNutritionSummary = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/nutrition/goals", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Error fetching nutrition data");

      const data = await response.json();
      console.log("Nutrition Data:", data);

      setNutritionSummary(data);
    } catch (error) {
      console.error("Failed to load nutrition summary:", error);
      setNutritionSummary({ error: "Fehler beim Laden der Daten" });
    } finally {
      setLoadingNutrition(false);
    }
  };

  // Fetch Today's Workout Plan
  const fetchWorkoutReminder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/training-plan", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Error fetching workout plan");

      const data = await response.json();
      console.log("Workout Plan Data:", data);

      const today = new Date().toLocaleDateString("de-DE", { weekday: "long" });
      setWorkoutReminder(data[today] || "Kein Training geplant");
    } catch (error) {
      console.error("Failed to load workout plan:", error);
      setWorkoutReminder("Fehler beim Laden des Trainings");
    } finally {
      setLoadingWorkout(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg text-center mb-6">
      <h2 className="text-xl font-bold mb-3">Tagesübersicht</h2>

      {/* Nutrition Summary */}
      <div className="mb-4">
        <h3 className="font-medium">Ernährungsfortschritt</h3>
        {loadingNutrition ? (
          <p className="text-gray-500">Ernährungsdaten laden...</p>
        ) : nutritionSummary?.error ? (
          <p className="text-red-500">{nutritionSummary.error}</p>
        ) : (
          <p>
            Kalorien: {nutritionSummary.calorie_target || "-"} kcal |
            Protein: {nutritionSummary.protein_target || "-"} g |
            Kohlenhydrate: {nutritionSummary.carbs_target || "-"} g |
            Fette: {nutritionSummary.fats_target || "-"} g
          </p>
        )}
      </div>

      {/* Workout Reminder */}
      <div className="mb-4">
        <h3 className="font-medium">Heutiges Training</h3>
        {loadingWorkout ? (
          <p className="text-gray-500">Laden...</p>
        ) : (
          <p>{workoutReminder}</p>
        )}
      </div>

      {/* Journal Prompt */}
      <div>
        <h3 className="font-medium">Tagebuch-Eintrag</h3>
        <p>{journalPrompt}</p>
      </div>
    </div>
  );
}

export default Tagesübersicht;
