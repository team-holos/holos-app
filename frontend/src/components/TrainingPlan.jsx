import React, { useState, useEffect } from "react";

const defaultPlan = {
  Monday: "Push",
  Tuesday: "Pull",
  Wednesday: "Rest",
  Thursday: "Legs",
  Friday: "Push",
  Saturday: "Pull",
  Sunday: "Rest",
};

const TrainingPlan = ({ trainingPlan, setTrainingPlan }) => {
  const [plan, setPlan] = useState(trainingPlan || defaultPlan);

  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem("trainingPlan"));
    if (savedPlan) {
      setPlan(savedPlan);
    }
  }, []);

  const handleChange = (day, newWorkout) => {
    setPlan((prevPlan) => ({ ...prevPlan, [day]: newWorkout }));
  };

  const saveTrainingPlan = () => {
    localStorage.setItem("trainingPlan", JSON.stringify(plan));
    alert("Training Plan Saved!");
    setTrainingPlan(plan);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl mb-2 font-semibold">Your Training Plan</h2>
      <div className="space-y-2">
        {Object.keys(plan).map((day) => (
          <div key={day} className="flex justify-between items-center">
            <span className="font-bold">{day}:</span>
            <select
              value={plan[day]}
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
