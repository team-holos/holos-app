import React from 'react';

function Ingredients({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => ( /*map()= jedes Element des Arrays wird der Reihe nach durchgegangen*/
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
  );
}

export default Ingredients;
