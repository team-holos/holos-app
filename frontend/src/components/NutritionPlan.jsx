import Meal from './Meal';

function NutritionPlan({ plan }) {
  console.log(plan);
  return (
    <div className='border'>
      {plan.map((plan, index) => (
        <div key={index}>
          <h2>{plan.day}</h2>
          <ul>
            {plan.meal.map((meal, i) => (
              <li key={i}>
                <strong>{meal.name}</strong>: {meal.ingredients.join(", ")} ({meal.calories} kcal)
              </li>
      ))}
          </ul>
        </div>

      ))}
        </div>
      )};
  
  


export default NutritionPlan;