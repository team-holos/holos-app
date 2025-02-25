import React, { useState, useEffect } from "react";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TrainingPlan = ({ trainingPlan, setTrainingPlan }) => {
  const [plan, setPlan] = useState(trainingPlan || {});

  // Fetch training plan from backend
  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/training/training-plan/1", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch training plan");

        const data = await response.json();
        setPlan(data);
        setTrainingPlan(data);
      } catch (error) {
        console.error("Error loading training plan:", error);
      }
    };

    fetchTrainingPlan();
  }, [setTrainingPlan]);

  // Update state when user changes dropdown
  const handleChange = (day, newWorkout) => {
    setPlan((prevPlan) => ({ ...prevPlan, [day]: newWorkout }));
  };

  // Save training plan to backend
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

      if (!response.ok) throw new Error("Failed to save training plan");

      alert("Training Plan Saved!");
      setTrainingPlan(plan);
    } catch (error) {
      console.error("Error saving training plan:", error);
      alert("Failed to save training plan.");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl mb-2 font-semibold">Your Training Plan</h2>
      <div className="space-y-2">
        {dayOrder.map((day) => (
          <div key={day} className="flex justify-between items-center">
            <span className="font-bold">{day}:</span>
            <select
              value={plan[day] || "Rest"}
              onChange={(e) => handleChange(day, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Legs">Legs</option>
              <option value="Rest">Rest</option>
              <option value="Cardio">Cardio</option>
              <option value="Full Body">Full Body</option>
            </select>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
        onClick={saveTrainingPlan}
      >
        Save Plan
      </button>
    </div>
  );
};

export default TrainingPlan;
