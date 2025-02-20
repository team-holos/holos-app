import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import WaterTracker from "../components/WaterTracker";
import SleepTracker from '../components/SleepTracker';
import StepsTracker from "../components/StepsTracker";
import { Moon, Footprints, Droplet } from 'lucide-react';

function DashboardPage() {
  const navigate = useNavigate();
  const [goalSteps, setGoalSteps] = useState(10000);
  

  const handleNavigation = (event) => {
    navigate(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoalSteps(parseInt(event.target.value, 10) || 0);
  };

  return (
    <div className="font-roboto text-[#2D336B] p-4 my-4 bg-white rounded-lg shadow-md"> 
      <h1 className="text-3xl font-bold mb-4 text-center">Willkommen, Benutzer!</h1> 

      <div className="grid grid-cols-1 gap-4"> 

        {/* Schritte-Bereich */}
        <StepsTracker goalSteps={goalSteps} onGoalChange={handleGoalChange} />
          

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