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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/exercises?${queryString}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
      };

      fetchData();
    }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

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