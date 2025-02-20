import React from 'react';

function NutritionPlan({ plan, selectedFood, portion }) {

    const calculateMealCalories = (meal) => {
        let totalCalories = 0;
        meal.ingredients.forEach(ingredientName => {
            const foodItem = selectedFood.find(food => food.name === ingredientName);
            if (foodItem) {
                totalCalories += foodItem.calories * portion;
            }
        });
        return totalCalories;
    };

    return (
        <div className='border'>
            {plan.map((planItem, index) => (
                <div key={index}>
                    <h2>{planItem.day}</h2>
                    <ul>
                        {planItem.meal.map((meal, i) => (
                            <li key={i}>
                                <strong>{meal.name}</strong>: {meal.ingredients.join(", ")} ({calculateMealCalories(meal)} kcal)
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default NutritionPlan;