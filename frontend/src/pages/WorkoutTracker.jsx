import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TrainingPlan from "../components/TrainingPlan";

const exercisesData = {
  Push: ["Bench Press", "Overhead Press", "Dips"],
  Pull: ["Deadlifts", "Pull-ups", "Barbell Rows"],
  Legs: ["Squats", "Romanian Deadlifts", "Calf Raises"],
  Cardio: ["Running", "Cycling", "Jump Rope"],
  "Full Body": ["Burpees", "Kettlebell Swings", "Thrusters"],
};

const WorkoutTrackerCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutLogs, setWorkoutLogs] = useState({});
  const [trainingPlan, setTrainingPlan] = useState({});
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const userId = 1;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:3000/api/training/training-plan/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTrainingPlan(data))
      .catch((err) => console.error("Error fetching training plan:", err));

    // Fetch workout logs from backend
    fetch(`http://localhost:3000/api/training/workout-log/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWorkoutLogs(data))
      .catch((err) => console.error("Error fetching workout logs:", err));
  }, [userId, token]);

  useEffect(() => {
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(selectedDate);
    const workoutType = trainingPlan[dayName] || "Rest";
    setCurrentWorkout(exercisesData[workoutType] || []);
  }, [selectedDate, trainingPlan]);

  const updateWorkoutLog = (exercise, field, value) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setWorkoutLogs((prevLogs) => {
      const updatedLogs = { ...prevLogs };
      if (!updatedLogs[dateKey]) updatedLogs[dateKey] = {};
      if (!updatedLogs[dateKey][exercise])
        updatedLogs[dateKey][exercise] = { sets: "", reps: "", weight: "" };
      updatedLogs[dateKey][exercise][field] = value;
      return updatedLogs;
    });
  };

  const saveWorkout = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const workouts = workoutLogs[dateKey];

    if (!workouts) return alert("No workout data to save!");

    Object.entries(workouts).forEach(([exercise, details]) => {
      fetch("http://localhost:3000/api/training/workout-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          date: dateKey,
          exercise,
          sets: details.sets,
          reps: details.reps,
          weight: details.weight,
        }),
      })
        .then((res) => res.json())
        .then(() => alert("Workout saved successfully!"))
        .catch((err) => console.error("Error saving workout:", err));
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";
  
    const dateKey = date.toISOString().split("T")[0];
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    const plannedWorkout = trainingPlan[dayName];
  
    if (workoutLogs[dateKey]) {
      return "bg-green-300 text-black font-bold";
    }
    if (plannedWorkout && plannedWorkout !== "Rest") {
      return "bg-blue-300 text-black font-bold";
    }
    return "text-black";
  };
  
  
  

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Workout Tracker & Calendar</h1>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
        />

        <div className="mt-6 border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl mb-2">
            Workout for {selectedDate.toISOString().split("T")[0]} (
            {trainingPlan[
              new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                selectedDate
              )
            ] || "Rest"}
            )
          </h2>

          {currentWorkout.length > 0 ? (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Exercise</th>
                  <th className="border px-2 py-1">Sets</th>
                  <th className="border px-2 py-1">Reps</th>
                  <th className="border px-2 py-1">Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                {currentWorkout.map((exercise) => (
                  <tr key={exercise} className="text-center">
                    <td className="border px-2 py-1">{exercise}</td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        className="w-12 border px-1"
                        value={
                          workoutLogs[
                            selectedDate.toISOString().split("T")[0]
                          ]?.[exercise]?.sets || ""
                        }
                        onChange={(e) =>
                          updateWorkoutLog(exercise, "sets", e.target.value)
                        }
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        className="w-12 border px-1"
                        value={
                          workoutLogs[
                            selectedDate.toISOString().split("T")[0]
                          ]?.[exercise]?.reps || ""
                        }
                        onChange={(e) =>
                          updateWorkoutLog(exercise, "reps", e.target.value)
                        }
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        className="w-16 border px-1"
                        value={
                          workoutLogs[
                            selectedDate.toISOString().split("T")[0]
                          ]?.[exercise]?.weight || ""
                        }
                        onChange={(e) =>
                          updateWorkoutLog(exercise, "weight", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-gray-500">
              No workout planned for this day.
            </p>
          )}

          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={saveWorkout}
          >
            Save Workout
          </button>
        </div>
      </div>

      <div className="md:w-1/3">
        <TrainingPlan
          trainingPlan={trainingPlan}
          setTrainingPlan={setTrainingPlan}
        />
      </div>
    </div>
  );
};

export default WorkoutTrackerCalendarPage;
