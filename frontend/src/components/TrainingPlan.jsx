import React, { useState, useEffect } from "react";

const dayOrder = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

const TrainingPlan = ({ trainingPlan, setTrainingPlan }) => {
  const [plan, setPlan] = useState(trainingPlan || {});

  // Trainingsplan vom Backend abrufen
  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/training/training-plan/1", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Fehler beim Abrufen des Trainingsplans");

        const data = await response.json();
        setPlan(data);
        setTrainingPlan(data);
      } catch (error) {
        console.error("Fehler beim Laden des Trainingsplans:", error);
      }
    };

    fetchTrainingPlan();
  }, [setTrainingPlan]);

  // Zustand aktualisieren, wenn der Nutzer das Dropdown ändert
  const handleChange = (day, newWorkout) => {
    setPlan((prevPlan) => ({ ...prevPlan, [day]: newWorkout }));
  };

  // Trainingsplan im Backend speichern
  const saveTrainingPlan = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/training/training-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_id: 1, trainingPlan: plan }),
      });

      if (!response.ok) throw new Error("Fehler beim Speichern des Trainingsplans");

      alert("Trainingsplan gespeichert!");
      setTrainingPlan(plan);
    } catch (error) {
      console.error("Fehler beim Speichern des Trainingsplans:", error);
      alert("Fehler beim Speichern des Trainingsplans.");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl mb-2 font-semibold">Dein Trainingsplan</h2>
      <div className="space-y-2">
        {dayOrder.map((day) => (
          <div key={day} className="flex justify-between items-center">
            <span className="font-bold">{day}:</span>
            <select
              value={plan[day] || "Ruhetag"}
              onChange={(e) => handleChange(day, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Legs">Beine</option>
              <option value="Rest">Ruhetag</option>
              <option value="Cardio">Cardio</option>
              <option value="Full Body">Ganzkörper</option>
            </select>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
        onClick={saveTrainingPlan}
      >
        Plan speichern
      </button>
    </div>
  );
};

export default TrainingPlan;
