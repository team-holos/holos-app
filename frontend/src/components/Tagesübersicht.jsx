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

  const fetchNutritionSummary = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setLoadingNutrition(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/nutrition/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch nutrition goals");

      const data = await response.json();
      setNutritionSummary(data);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      setNutritionSummary({ error: "Fehler beim Laden der Daten" });
    } finally {
      setLoadingNutrition(false);
    }
  };

  const fetchTotalNutrition = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/api/nutrition/total", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error fetching total nutrition");

      const data = await response.json();
      setTotalNutrition(data);
    } catch (error) {
      console.error("Failed to load total nutrition:", error);
    }
  };

  const fetchWorkoutReminder = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      if (!userId) {
        console.error("User ID not found in localStorage");
        setWorkoutReminder("Fehler beim Laden des Trainings");
        return;
      }

      if (!token) {
        console.error("JWT Token is missing in localStorage!");
        setWorkoutReminder("Fehler: Nicht angemeldet.");
        return;
      }

      console.log("Using Token:", token); // ✅ Debugging
      console.log("Fetching training plan for user:", userId);

      const response = await fetch(`http://localhost:3000/api/training-plan/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Workout API Response:", response); // ✅ Debugging

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Workout Plan Data:", data); // ✅ Debugging

      const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
      console.log("Today is:", today); // ✅ Debugging

      if (data && data[today]) {
        setWorkoutReminder(`Heute: ${data[today]}`);
      } else {
        setWorkoutReminder("Kein Training geplant");
      }
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
        {loadingWorkout ? (
          <p className="text-gray-500">Lade Trainingsdaten...</p>
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
