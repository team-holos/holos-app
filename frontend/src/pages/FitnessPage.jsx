import React from 'react';
import Exercise from '../components/Exercise';

function FitnessPage() {
  const exercises = [
    {
      id: 1,
      name: "Liegestütze",
      description: "Eine klassische Übung für den Oberkörper.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    },
    {
      id: 2,
      name: "Kniebeugen",
      description: "Eine Grundübung für die Beinmuskulatur.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    },
    {
      id: 3,
      name: "Rudern",
      description: "Eine Übung für den Rücken und die Arme.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    },
    {
      id: 4,
      name: "Plank",
      description: "Eine statische Übung zur Stärkung des Rumpfes.",
      video: "https://www.youtube.com",
      type: "Core Training"
    },
    {
      id: 5,
      name: "Ausfallschritte",
      description: "Eine Variation der Kniebeuge für mehr Balance.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    },
    {
      id: 6,
      name: "Dips",
      description: "Eine anspruchsvolle Übung für den Oberkörper.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    },
    {
      id: 7,
      name: "Klimmzüge",
      description: "Eine der besten Übungen für den Rücken.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    },
    {
      id: 8,
      name: "Crunches",
      description: "Eine Übung für die Bauchmuskulatur.",
      video: "https://www.youtube.com",
      type: "Core Training"
    },
    {
      id: 9,
      name: "Wadenheben",
      description: "Eine Übung für die Wadenmuskulatur.",
      video: "https://www.youtube.com",
      type: "Strength Training"
    }
  ];

  return (
    <div>
      {exercises.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

export default FitnessPage;