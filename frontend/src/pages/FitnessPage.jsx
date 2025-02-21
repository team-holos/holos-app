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
      video: "https://www.youtube.com/watch?v=RgiGWSRXtmA",
      type: "Krafttraining"
    },
    {
      id: 5,
      name: "Rudern mit Kurzhanteln",
      category: "Krafttraining",
      goal: "Muskelaufbau",
      level: "Mittel",
      description: "Stärkt den Rücken und die Arme.",
      video: "https://www.youtube.com/watch?v=Ccs4xNjkxdA",
      type: "Krafttraining"
    },
    {
      id: 6,
      name: "Superman",
      category: "Rückentraining",
      goal: "Rumpfstabilität",
      level: "Anfänger",
      description: "Stärkt die untere Rückenmuskulatur.",
      video: "https://www.youtube.com/watch?v=r82btQ4r2no",
      type: "Krafttraining"
    },
    {
      id: 7,
      name: "Bicycle crunch",
      category: "Core-Training",
      goal: "Aufbau von Bauchmuskulatur",
      level: "Anfänger",
      description: "Bauchmuskeltraining.",
      video: "https://www.youtube.com/watch?v=-nJkAJpQemI",
      type: "Core-Training"
    },
    {
      id: 8,
      name: "Joggen",
      category: "Cardio",
      goal: "Ausdauer",
      level: "Anfänger",
      description: "Fördert die Ausdauer und stärkt das Herz-Kreislauf-System.",
      video: "https://www.youtube.com/watch?v=MbgzyeIUOpA",
      type: "Cardio"
    },
    {
      id: 9,
      name: "HIIT",
      category: "Cardio & Kraft",
      goal: "Ausdauer",
      level: "Anfänger",
      description: "Ganzkörpertraining",
      video: "https://www.youtube.com/watch?v=FeR-4_Opt-g",
      type: "Cardio & Kraft"
    },
    {
      id: 10,
      name: "Pilates",
      category: "Flexibilität & Core-Training",
      goal: "Körperhaltung & Core-Stärke",
      level: "Anfänger",
      description: "Verbessert Körperhaltung, stärkt die Körpermitte und fördert die Flexibilität.",
      video: "https://www.youtube.com/watch?v=IXi2tcj3Buo",
      type: "Flexibilität & Core-Training"
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