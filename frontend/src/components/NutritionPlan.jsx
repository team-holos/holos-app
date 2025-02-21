import React from 'react';

function NutritionPlan({ plan }) {
    return (
        <div>
            {plan.map((dayPlan, index) => (
                <div key={index}>
                    <h2>{dayPlan.day}</h2>
                    <ul>
                        {dayPlan.meal.map((meal, mealIndex) => (
                            <li key={mealIndex}>
                                {meal.name}: {meal.ingredients.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default NutritionPlan;
