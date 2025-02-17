
import React, { useState } from 'react';

function WaterTracker() {
    let [waterConsumed, setWaterConsumed] = useState(0);
    const [waterGoal, setWaterGoal] = useState(2000);

    const logWaterIntake = () => {
        setWaterConsumed(waterConsumed + 250);
    };

    return (
        <div>
            <h2>Water Tracker</h2>
            <div>
                Consumed: {waterConsumed} ml / Goal: {waterGoal} ml
                <div style={{ width: `${(waterConsumed / waterGoal) * 100}%`, height: '20px', backgroundColor: 'blue' }}></div>
            </div>
            <button onClick={logWaterIntake}>Wasser trinken!</button>
        </div>
    );
}

export default WaterTracker;