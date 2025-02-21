// Exercises.jsx
import React, { useState, useEffect } from 'react';
import Exercise from './Exercise';
import CategoryFilter from './CategoryFilter';
import GoalFilter from './GoalFilter';
import LevelFilter from './LevelFilter';

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    goal: 'all',
    level: 'all',
  });

  useEffect(() => {
    // Mock-Daten (ersetzen, wenn das Backend fertig ist)
    const mockData = [
      { id: 1, name: 'Liegestütze', category: 'Krafttraining', goal: 'Muskelaufbau', level: 'Anfänger' },
      { id: 2, name: 'Kniebeugen', category: 'Krafttraining', goal: 'Beine', level: 'Anfänger' },
      { id: 3, name: 'Joggen', category: 'Cardio', goal: 'Ausdauer', level: 'Anfänger' },
      // ... weitere Übungen
    ];

    // Filterlogik (ohne Backend)
    const filteredExercises = mockData.filter(exercise => {
      return (
        (filters.category === 'all' || exercise.category === filters.category) &&
        (filters.goal === 'all' || exercise.goal === filters.goal) &&
        (filters.level === 'all' || exercise.level === filters.level)
      );
    });

    setExercises(filteredExercises);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Übungen</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <CategoryFilter onChange={value => handleFilterChange('category', value)} />
        <GoalFilter onChange={value => handleFilterChange('goal', value)} />
        <LevelFilter onChange={value => handleFilterChange('level', value)} />
      </div>

      {exercises.length === 0 ? (
        <p className="text-center text-gray-500">Keine Übungen gefunden.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exercises.map(exercise => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Exercises;