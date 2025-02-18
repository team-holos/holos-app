import React from 'react';

function GoalFilter() {
    return (
        <div>
            <label htmlFor="goal">Ziel:</label>
            <select id="goal">
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
            </select>
        </div>
    );
}

export default GoalFilter;