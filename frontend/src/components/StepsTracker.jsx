import React, { useState, useEffect } from "react";
import { Footprints } from "lucide-react";
function StepsTracker({ goalSteps }) {
    const [steps, setSteps] = useState(0);
    const [simulationActiv, setSimulationActiv] = useState(false);
    useEffect(() => {
        let interval;
        if (simulationActiv) {
            interval = setInterval(() => {
                setSteps((prevSteps) => {
                    const newSteps = Math.min(prevSteps + Math.floor(Math.random() * 500), goalSteps);
                    return newSteps;
                });
            }, 5000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [simulationActiv, goalSteps]);
    const startSimulation = () => {
        setSimulationActiv(true);
    };
    const stopSimulation = () => {
        setSimulationActiv(false);
    };
    const handleGoalChange = (event) => {
    }
    const progress = (steps / goalSteps) * 100;
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium flex items-center">
                    <Footprints className="w-5 h-5 mr-2" />
                </span>
                <span className="text-xl font-bold">{steps} / {goalSteps}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full">
                <div className="bg-green-500 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}> </div>
            </div>
            <div className="mt-2 flex items-center">
                <label htmlFor="goal" className="mr-2">Ziel:</label>
                <input
                    type="number"
                    id="goal"
                    onChange={handleGoalChange}
                    className="border border-gray-300 rounded px-2 py-1 w-20"
                />
                <button
                    onClick={simulationActiv ? stopSimulation : startSimulation}
                    style={{ backgroundColor: '#A9B5DF', color: 'white' }}
                    className={`ml-2 px-3 py-1 rounded ${simulationActiv ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                >
                    {simulationActiv ? "Stopp" : "Start"}
                </button>
            </div>
        </div>
    );
}
export default StepsTracker;