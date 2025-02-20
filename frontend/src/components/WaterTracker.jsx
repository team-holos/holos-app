
import React, { useState } from 'react';

function WaterTracker() {
    let [waterConsumed, setWaterConsumed] = useState(0);
    const [waterGoal, setWaterGoal] = useState(2000);

    const logWaterIntake = () => {
        setWaterConsumed(waterConsumed + 250);
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 border border-gray-300">
            <h2 className="text-lg font-medium mb-2">Wasser Tracker</h2>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold">{waterConsumed} ml</span>
                    <span>/{waterGoal} ml</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-2" style={{ width: `${(waterConsumed / waterGoal) * 100}%` }}> </div>
                </div>
            </div>
            <button
                onClick={logWaterIntake}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Wasser getrunken (+250ml)
            </button>
        </div>
    );
}

export default WaterTracker;
