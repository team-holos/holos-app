import React, { useState, useEffect } from 'react';
import Exercise from '../components/Exercise';
import CategoryFilter from '../components/CategoryFilter';
import GoalFilter from '../components/GoalFilter';
import LevelFilter from '../components/LevelFilter';

function FitnessPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [goalFilter, setGoalFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');

  useEffect(() => {
    setLoading(true); // Ladeanzeige aktivieren
    fetch('http://localhost:3000/exercises')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); 
        return res.json();
        }
      })
      .then(data => setExercises(data))
      .catch(error => setError(error)) // Fehler setzen
      .finally(() => setLoading(false)); // Ladeanzeige deaktivieren
  }, []);

  const filteredExercises = exercises.filter(exercise => {
    return (
      (categoryFilter === 'All' || exercise.category === categoryFilter) &&
      (goalFilter === 'All' || exercise.goal === goalFilter) &&
      (levelFilter === 'All' || exercise.level === levelFilter)
    );
  });

  const resetFilters = () => {
    setCategoryFilter('All');
    setGoalFilter('All');
    setLevelFilter('All');
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>; 
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>; 
  }

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-2xl font-bold mb-4">Fitness-Übungen</h1>
      <p className="mb-4 text-gray-700">Finde die passenden Übungen für dein Training.</p> 

      <div className="mb-4 flex space-x-2"> 
        <CategoryFilter onFilterChange={setCategoryFilter} />
        <GoalFilter onFilterChange={setGoalFilter} />
        <LevelFilter onFilterChange={setLevelFilter} />
        <button onClick={resetFilters} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Filter zurücksetzen
        </button>
      </div>

      {filteredExercises.length === 0 ? (
        <p className="text-center text-gray-500">Keine Übungen gefunden.</p> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
          {filteredExercises.map(exercise => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FitnessPage;