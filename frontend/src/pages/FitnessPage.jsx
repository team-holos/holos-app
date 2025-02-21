import React, { useState, useEffect } from "react";
import Exercise from "../components/Exercise";
import CategoryFilter from "../components/CategoryFilter";
import GoalFilter from "../components/GoalFilter";
import LevelFilter from "../components/LevelFilter";

function FitnessPage() {
  const [exercises, setExercises] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("Alle");
  const [goalFilter, setGoalFilter] = useState("Alle");
  const [levelFilter, setLevelFilter] = useState("Alle");

  const exercisesData = [
    {
      id: 1,
      name: "Liegestütze",
      category: "Krafttraining",
      goal: "Muskelaufbau",
      level: "Anfänger",
      description: "Eine klassische Übung für den Oberkörper.",
      video: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      type: "Krafttraining"
    }, 
    {
      id: 3,
      name: "Joggen",
      category: "Cardio",
      goal: "Ausdauer",
      level: "Anfänger",
      description: "Einfaches Ausdauertraining.",
      video: "https://www.youtube.com/watch?v=m_jlWBxYmQc",
      type: "Cardio"
    },
    {
      id: 4,
      name: "Plank",
      category: "Core",
      goal: "Rumpfstabilität",
      level: "Anfänger",
      description: "Statische Übung zur Stärkung der Rumpfmuskulatur.",
      video: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
      type: "Krafttraining"
    },
    {
      id: 5,
      name: "Sit-Ups",
      category: "Core",
      goal: "Bauchmuskulatur",
      level: "Anfänger",
      description: "Übung zur Stärkung der Bauchmuskulatur.",
      video: "https://www.youtube.com/watch?v=NLv19n91U_w",
      type: "Krafttraining"
    },
    {
      id: 6,
      name: "Dumbbell Rows",
      category: "Krafttraining",
      goal: "Rücken",
      level: "Fortgeschritten",
      description: "Übung mit Hanteln für den oberen Rücken.",
      video: "https://www.youtube.com/watch?v=v_AXnxq04V8",
      type: "Krafttraining"
    },
    {
      id: 7,
      name: "Push-Ups (mit Knien)",
      category: "Krafttraining",
      goal: "Brust",
      level: "Anfänger",
      description: "Leichtere Variante der Liegestütze auf den Knien.",
      video: "https://www.youtube.com/watch?v=NKejWkAyP7w",
      type: "Krafttraining"
    },
    {
      id: 8,
      name: "Burpees",
      category: "Cardio",
      goal: "Ganzkörper",
      level: "Fortgeschritten",
      description: "Dynamische Übung für den ganzen Körper.",
      video: "https://www.youtube.com/watch?v=tJrdPdKjmJc",
      type: "Cardio"
    },
    {
      id: 9,
      name: "Yoga (Flow)",
      category: "Flexibilität",
      goal: "Ganzkörper",
      level: "Mittel",
      description: "Yoga-Session zur Verbesserung der Flexibilität.",
      video: "https://www.youtube.com/watch?v=v7Ay5p799E8",
      type: "Flexibilität"
    },
    {
      id: 10,
      name: "Wandern",
      category: "Cardio",
      goal: "Ausdauer",
      level: "Anfänger",
      description: "Einfaches Ausdauertraining in der Natur.",
      video: "https://www.youtube.com/watch?v=jL-oW757k44",
      type: "Cardio"
    },
  ];

  useEffect(() => {
    const filteredExercises = exercisesData.filter(exercise => {
      return (
        (categoryFilter === "Alle" || exercise.category === categoryFilter) &&
        (goalFilter === "Alle" || exercise.goal === goalFilter) &&
        (levelFilter === "Alle" || exercise.level === levelFilter)
      );
    });

    setExercises(filteredExercises);
  }, [categoryFilter, goalFilter, levelFilter]);

  return (
    <div>
      <CategoryFilter exercisesData={exercisesData} onChange={setCategoryFilter} />
      <GoalFilter exercisesData={exercisesData} onChange={setGoalFilter} />
      <LevelFilter exercisesData={exercisesData} onChange={setLevelFilter} />
      {exercises.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

export default FitnessPage;