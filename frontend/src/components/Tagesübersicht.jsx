import React, { useState, useEffect } from "react";

function Tagesübersicht() {
  const [nutritionSummary, setNutritionSummary] = useState(null);
  const [totalNutrition, setTotalNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [workoutReminder, setWorkoutReminder] = useState("Laden...");
  const [journalPrompt, setJournalPrompt] = useState("Wie fühlst du dich heute?");
  const [loadingNutrition, setLoadingNutrition] = useState(true);
  const [loadingWorkout, setLoadingWorkout] = useState(true);

  useEffect(() => {
    fetchNutritionSummary();
    fetchTotalNutrition();
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

  // Fetch Total Logged Nutrition Data for Today
  const fetchTotalNutrition = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/nutrition/total", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      if (!response.ok) throw new Error("Error fetching total nutrition");
      
      const data = await response.json();
      console.log("Today's Total Nutrition:", data);
      setTotalNutrition(data);
    } catch (error) {
      console.error("Failed to load total nutrition:", error);
    }
  };

  const fetchWorkoutReminder = async () => {
    try {
      const userId = localStorage.getItem("user_id");
  
      if (!userId) {
        console.error("User ID not found in localStorage");
        setWorkoutReminder("Fehler beim Laden des Trainings");
        return;
      }
  
      const response = await fetch(`http://localhost:3000/api/training-plan/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Workout Plan Data:", data); 
  
      const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
      setWorkoutReminder(data[today] || "Kein Training geplant");
    } catch (error) {
      console.error("Failed to load workout plan:", error);
      setWorkoutReminder("Fehler beim Laden des Trainings");
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
            Kalorien: {totalNutrition.calories} / {nutritionSummary.calorie_target} kcal |
            Protein: {totalNutrition.protein} / {nutritionSummary.protein_target} g |
            Kohlenhydrate: {totalNutrition.carbs} / {nutritionSummary.carbs_target} g |
            Fette: {totalNutrition.fats} / {nutritionSummary.fats_target} g
          </p>
        )}
      </div>

      {/* Workout Reminder */}
      <div className="mb-4">
        <h3 className="font-medium">Heutiges Training</h3>
        <p>{workoutReminder}</p>
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
