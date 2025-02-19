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
  const fetchData = async () => {
      const queryString = new URLSearchParams(filters).toString(); // Filterparameter in URL umwandeln
      const response = await fetch(`/api/exercises?${queryString}`);
      const data = await response.json();
      setExercises(data);
  };

  fetchData();
}, [filters]); // useEffect wird aufgerufen, wenn sich die Filter ändern

const handleFilterChange = (filterType, value) => {
  setFilters({ ...filters, [filterType]: value });
};

return (
  <div>
      <CategoryFilter onChange={value => handleFilterChange('category', value)} />
      <GoalFilter onChange={value => handleFilterChange('goal', value)} />
      <LevelFilter onChange={value => handleFilterChange('level', value)} />
      {exercises.map(exercise => (
          <Exercise key={exercise.id} exercise={exercise} />
      ))}
  </div>
);
}

export default Exercises;