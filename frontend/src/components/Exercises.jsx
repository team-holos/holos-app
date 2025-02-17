import React, { useState, useEffect } from 'react';
import Exercise from './Exercise';

function Exercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/Exercises')
      .then(res => res.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
  }, []);

  return (
    <div>
      {exercises.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

export default Exercises;