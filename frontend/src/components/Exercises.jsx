import React from 'react';

function Exercise(props) {
  const { exercise } = props;

  return (
    <div>
      <h3>{exercise.name}</h3>
      <p>Sets: {exercise.sets}</p>
      <p>Repetitions: {exercise.repetitions}</p>
      {exercise.weight && <p>Weight: {exercise.weight} kg</p>} /*Bedingtes Rendering, prüft ob exercise weight Attribut hat, damit es gerendert wird, wenn true*/
    </div>
  );
}

export default Exercise;