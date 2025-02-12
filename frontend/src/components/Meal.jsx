import React, { useState } from 'react';
import Ingredients from './Ingredients.jsx';

function Meal({ meal }) {
  const [IngredientsVisible, setIngredientsVisible] = useState(false);

  return (
    <div>
      <h3>{meal.name} ({meal.calories} kcal)</h3>
      <button onClick={() => setIngredientsVisible(!IngredientsVisible)}> 
        {IngredientsVisible ? "Zutaten verbergen" : "Zutaten anzeigen"} 
      </button>
      {IngredientsVisible && <Ingredients ingredients={meal.ingredients} />}
    </div>
  );
}

export default Meal;