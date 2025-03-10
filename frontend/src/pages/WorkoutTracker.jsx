import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TrainingPlan from "../components/TrainingPlan";

const exercisesData = {
  Push: ["Bankdrücken", "Schulterdrücken", "Dips"],
  Pull: ["Kreuzheben", "Klimmzüge", "Langhantelrudern"],
  Legs: ["Kniebeugen", "Rumänisches Kreuzheben", "Wadenheben"],
  Cardio: ["Laufen", "Radfahren", "Springseil"],
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
      .catch((err) => console.error("Fehler beim Abrufen des Trainingsplans:", err));

    // Trainingsprotokolle vom Backend abrufen
    fetch(`http://localhost:3000/api/training/workout-log/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWorkoutLogs(data))
      .catch((err) => console.error("Fehler beim Abrufen der Trainingsdaten:", err));
  }, [userId, token]);

  useEffect(() => {
    const dayName = new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
    }).format(selectedDate);
    const workoutType = trainingPlan[dayName] || "Ruhetag";
    setCurrentWorkout(exercisesData[workoutType] || []);
  }, [selectedDate, trainingPlan]);

  const updateWorkoutLog = (exercise, field, value) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setWorkoutLogs((prevLogs) => {
      const updatedLogs = { ...prevLogs };
      if (!updatedLogs[dateKey]) updatedLogs[dateKey] = {};
      if (!updatedLogs[dateKey][exercise])
        updatedLogs[dateKey][exercise] = { sets: "", reps: "", gewicht: "" };
      updatedLogs[dateKey][exercise][field] = value;
      return updatedLogs;
    });
  };

  const saveWorkout = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const workouts = workoutLogs[dateKey];

    if (!workouts) return alert("Keine Trainingsdaten zum Speichern!");

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
          weight: details.gewicht,
        }),
      })
        .then((res) => res.json())
        .then(() => alert("Training erfolgreich gespeichert!"))
        .catch((err) => console.error("Fehler beim Speichern des Trainings:", err));
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";
  
    const dateKey = date.toISOString().split("T")[0];
    const dayName = new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(date);
    const plannedWorkout = trainingPlan[dayName];
  
    if (workoutLogs[dateKey]) {
      return "bg-green-300 text-black font-bold";
    }
    if (plannedWorkout && plannedWorkout !== "Ruhetag") {
      return "bg-blue-300 text-black font-bold";
    }
    return "text-black";
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Trainingsplan & Kalender</h1>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
        />

        <div className="mt-6 border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl mb-2">
            Training für {selectedDate.toISOString().split("T")[0]} (
            {trainingPlan[
              new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(
                selectedDate
              )
            ] || "Ruhetag"}
            )
          </h2>

          {currentWorkout.length > 0 ? (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Übung</th>
                  <th className="border px-2 py-1">Sätze</th>
                  <th className="border px-2 py-1">Wiederholungen</th>
                  <th className="border px-2 py-1">Gewicht (kg)</th>
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
                          ]?.[exercise]?.gewicht || ""
                        }
                        onChange={(e) =>
                          updateWorkoutLog(exercise, "gewicht", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-gray-500">
              Kein Training für diesen Tag geplant.
            </p>
          )}

          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={saveWorkout}
          >
            Training speichern
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
