import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import WaterTracker from "../components/WaterTracker";
import SleepTracker from '../components/SleepTracker';
import { Moon, Footprints, Droplet } from 'lucide-react';

function DashboardPage() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(0);
  const [goalSteps, setGoalSteps] = useState(10000);
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
  }, [simulationActiv]);

  const handleNavigation = (event) => {
    navigate(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoalSteps(parseInt(event.target.value, 10) || 0);
  };

  const startSimulation = () => {
    setSimulationActiv(true);
  };

  const stopSimulation = () => {
    setSimulationActiv(false);
  };
  const progress = (steps / goalSteps) * 100;

  return (
    <div className="font-roboto text-[#2D336B] p-4 my-4 bg-white rounded-lg shadow-md"> {/* Container */}
      <h1 className="text-3xl font-bold mb-4 text-center">Willkommen, Benutzer!</h1> {/* Überschrift */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid-Layout für Bereiche */}

        {/* Schritte-Bereich */}
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
              value={goalSteps}
              onChange={handleGoalChange}
              className="border border-gray-300 rounded px-2 py-1 w-20"
            />
            <button
              onClick={simulationActiv ? stopSimulation : startSimulation}
              className={`ml-2 px-3 py-1 rounded ${simulationActiv ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            >
              {simulationActiv ? "Stopp" : "Start"}
            </button>
          </div>
        </div>

        {/* Wasser-Bereich */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium flex items-center">
              <Droplet className="w-5 h-5 mr-2" />
            </span>
          </div>
          <WaterTracker />
        </div>

        {/* Schlaf-Bereich */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2 ">
            <span className="text-lg font-medium flex items-center">
              <Moon className="w-5 h-5 mr-2" />
            </span>
          </div>
          <SleepTracker />
        </div>

      </div>

      {/* Navigations-Dropdown */}
      <div className="mt-8">
        <select id="uebersicht" name="uebersicht" onChange={handleNavigation} className="border border-gray-300 rounded px-4 py-2">
          <option value="">Nächste Aufgabe...</option>
          <option value="/nutrition">Ernährung</option>
          <option value="/fitness">Fitness</option>
          <option value="/mentalhealth">Mentale Gesundheit</option>
          <option value="/relaxation">Entspannung</option>
          <option value="/settings">Einstellungen</option>
        </select>
      </div>
    </div>
  );
}

export default DashboardPage;