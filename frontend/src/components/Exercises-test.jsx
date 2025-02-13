import React from 'react';

function Exercises(props) {
  const { exercises } = props;

  return (
    <div>
      <h3>{exercises.name}</h3>
      <p>Sets: {exercises.sets}</p>
      <p>Repetitions: {exercises.repetitions}</p>
      {exercises.weight && <p>Weight: {exercises.weight} kg</p>} /*Bedingtes Rendering, prüft ob exercise weight Attribut hat, damit es gerendert wird, wenn true*/
    </div>
  );
}

export default Exercises;