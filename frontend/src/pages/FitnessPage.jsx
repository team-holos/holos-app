import React, { useState, useEffect } from "react";
import Exercise from "../components/Exercise";
import CategoryFilter from "../components/CategoryFilter";
import GoalFilter from "../components/GoalFilter";
import LevelFilter from "../components/LevelFilter";

const FitnessPage = () => {
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
    id: 2,
    name: "Kniebeugen",
    category: "Krafttraining",
    goal: "Muskelaufbau",
    level: "Anfänger",
    description: "Trainiert die Oberschenkel- und Gesäßmuskulatur.",
    video: "https://www.youtube.com/watch?v=aclHkVaku9U",
    type: "Krafttraining"
  },
  {
    id: 3,
    name: "Plank",
    category: "Core-Training",
    goal: "Rumpfstabilität",
    level: "Anfänger",
    description: "Stärkt die Bauch- und Rumpfmuskulatur.",
    video: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    type: "Krafttraining"
  },
  {
    id: 4,
    name: "Ausfallschritte",
    category: "Krafttraining",
    goal: "Muskelaufbau",
    level: "Anfänger",
    description: "Trainiert Beine und Gesäßmuskulatur.",
    video: "https://www.youtube.com/watch?v=L8fvypPrXSI",
    type: "Krafttraining"
  },
  {
    id: 5,
    name: "Rudern mit Kurzhanteln",
    category: "Krafttraining",
    goal: "Muskelaufbau",
    level: "Mittel",
    description: "Stärkt den Rücken und die Arme.",
    video: "https://www.youtube.com/watch?v=v_AXnxqA7lY",
    type: "Krafttraining"
  },
  {
    id: 6,
    name: "Superman",
    category: "Rückentraining",
    goal: "Rumpfstabilität",
    level: "Anfänger",
    description: "Stärkt die untere Rückenmuskulatur.",
    video: "https://www.youtube.com/watch?v=Y9I0q5r7_m8",
    type: "Krafttraining"
  },
  {
    id: 7,
    name: "Fahrradfahren",
    category: "Cardio",
    goal: "Ausdauer",
    level: "Anfänger",
    description: "Ein tolles Herz-Kreislauf-Training.",
    video: "https://www.youtube.com/watch?v=2_c9-iGpxl8",
    type: "Cardio"
  },
  {
    id: 8,
    name: "Joggen",
    category: "Cardio",
    goal: "Ausdauer",
    level: "Anfänger",
    description: "Fördert die Ausdauer und stärkt das Herz-Kreislauf-System.",
    video: "https://www.youtube.com/watch?v=m_c6_W5-t7o",
    type: "Cardio"
  },
  {
    id: 9,
    name: "Schwimmen",
    category: "Cardio",
    goal: "Ausdauer",
    level: "Anfänger",
    description: "Ganzkörpertraining, schonend für die Gelenke.",
    video: "https://www.youtube.com/watch?v=m_c6_W5-t7o",
    type: "Cardio"
  },
  {
    id: 10,
    name: "Yoga",
    category: "Flexibilität",
    goal: "Dehnung",
    level: "Anfänger",
    description: "Fördert Flexibilität und Entspannung.",
    video: "https://www.youtube.com/watch?v=v7Ayj4IJ9Y8",
    type: "Flexibilität"
  }
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
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Dein persönlicher Fitnessplan</h1>
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
      <CategoryFilter exercisesData={exercisesData} onChange={setCategoryFilter} />
      <GoalFilter exercisesData={exercisesData} onChange={setGoalFilter} />
      <LevelFilter exercisesData={exercisesData} onChange={setLevelFilter} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map(exercise => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

export default FitnessPage;