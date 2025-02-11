import React from 'react';
import Meal from './Meal';
import nutritionplan from '../pages/NutritionPlanData';

function Nutritionplan({ plan }) {
  return (
    <div>
      {plan.map((day) => ( /*Für jeden Tag im Plan wird ein neues <div> Element erstellt, das den Tag und die Mahlzeiten enthält.*/
        <div key={day.day}> /*key wichtig, wenn man in React Listen rendert,hilft react  einzelne Elemente effizient zu aktualisieren, day.day wird als Schlüssel verwendet, was der Name eines Tages sein soll.*/
          <h2>{day.day}</h2>
          {day.meal((meal) => ( 
            <Meal key={meal.name} meal={meal} /> /*Für jede Mahlzeit an einem Tag wird ein neues <Meal> Element erstellt, das die Mahlzeit enthält.*/
          ))}
        </div>
      ))}
    </div>
  );
}

export default nutritionplan;