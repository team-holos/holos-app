import React from "react";

function GoalFilter({ onChange }) {
    const goals = [...new Set(exercisesData.map(exercise => exercise.goal))];
    return (
        <div className="mb-4">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Ziel:</label>
            <label htmlFor="goal">Ziel:</label>
            <select id="goal"
                onChange={e => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 sm:text-sm"
            >
                <option value="all">Alle</option>
                <option value="weightLoss">Gewichtsverlust</option>
                <option value="muscleGain">Muskelaufbau</option>
                <option value="maintenance">Erhaltung</option>
                <option value="endurance">Ausdauer</option>
                <option value="strength">Kraft</option>
                <option value="flexibility">Flexibilität</option>
                <option value="balance">Gleichgewicht</option>
                <option value="coordination">Koordination</option>
                <option value="generalFitness">Allgemeine Fitness</option>
                <option value="sportsPerformance">Sportliche Leistung</option>
                <option value="rehabilitation">Rehabilitation</option>
                <option value="stressReduction">Stressabbau</option>
                <option value="mentalWellness">Psychisches Wohlbefinden</option>
                {goals.map(goal => (
                    <option key={goal} value={goal}>{goal}</option>
                ))}
            </select>
        </div>
    );
}


export default GoalFilter;