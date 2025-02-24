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

  useEffect(() => {
    const mockData = [
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
        id: 2,
        name: "Kniebeugen",
        category: "Krafttraining",
        goal: "Beine",
        level: "Anfänger",
        description: "Grundübung für die Beinmuskulatur.",
        video: "https://www.youtube.com/watch?v=aclHkVaku9U",
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
     
    ];

    const filteredExercises = mockData.filter(exercise => {
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
      <CategoryFilter onFilterChange={setCategoryFilter} />
      <GoalFilter onFilterChange={setGoalFilter} />
      <LevelFilter onFilterChange={setLevelFilter} />
      {filteredExercises.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

export default FitnessPage;