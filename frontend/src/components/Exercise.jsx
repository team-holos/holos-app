import React from 'react';

function Exercise({ exercise }) {
  return (
    <div className="border rounded p-4 shadow-md bg-white"> 
      <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
      {exercise.description && <p className="text-gray-700 mb-2">{exercise.description}</p>} 
      {exercise.video && ( // Nur anzeigen, wenn ein Video vorhanden ist
        <a href={exercise.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Video
        </a>
      )}
      <p className="mt-2">
        <span className="font-medium">Typ:</span> {exercise.type}
      </p>
    </div>
  );
}

export default Exercise;