import React from 'react';

function Exercise({ exercise }) {
  return (
    <div>
      <h3><strong>{exercise.name}</strong></h3>
      <p>{exercise.description}</p>
      <a href={exercise.video} target="_blank" rel="noopener noreferrer">Video</a> // verknüpfte Ressource in einem neuen Browserkontext öffnen, rel="noopener noreferrer" als Sicherheitsmaßnahme
      <p>Typ: {exercise.type}</p>
    </div>
  );
}

export default Exercise;