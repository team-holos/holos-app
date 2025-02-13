import React from 'react';
import Exercise from '../components/Exercise';
import CategoryFilter from '../components/CategoryFilter';
import GoalFilter from '../components/GoalFilter';
import LevelFilter from '../components/LevelFilter';

function FitnessPage() {
  const [exercises, setExercises] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [goalFilter, setGoalFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3000/exercises')
      .then(res => res.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredExercises = exercises.filter(exercise => {
    return (
      (categoryFilter === 'All' || exercise.category === categoryFilter) &&
      (goalFilter === 'All' || exercise.goal === goalFilter) &&
      (levelFilter === 'All' || exercise.level === levelFilter)
    );
  });

  return (
    <div>
      <CategoryFilter onFilterChange={setCategoryFilter} />
      <GoalFilter onFilterChange={setGoalFilter} />
      <LevelFilter onFilterChange={setLevelFilter} />
      {filteredExercises.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

export default FitnessPage;