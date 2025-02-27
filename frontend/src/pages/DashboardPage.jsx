import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tagesübersicht from "../components/Tagesübersicht";
import WaterTracker from "../components/WaterTracker";
import SleepTracker from "../components/SleepTracker";
import StepsTracker from "../components/StepsTracker";
import { Moon, Footprints, Droplet } from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const [goalSteps, setGoalSteps] = useState(10000);
  const [username, setUsername] = useState("Benutzer"); // Default to "Benutzer"

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch username");

        const data = await response.json();
        setUsername(data.username); // Set the retrieved username
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleNavigation = (event) => {
    navigate(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoalSteps(parseInt(event.target.value, 10) || 0);
  };

  return (
    <div className="font-roboto text-[#2D336B] p-4 my-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Willkommen, {username}!</h1>

      {/* Tagesübersicht Section */}
      <Tagesübersicht />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StepsTracker goalSteps={goalSteps} onGoalChange={handleGoalChange} />
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium flex items-center">
              <Droplet className="w-5 h-5 mr-2" />
              Wasser
            </span>
          </div>
          <WaterTracker />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium flex items-center">
              <Moon className="w-5 h-5 mr-2" />
              Schlaf
            </span>
          </div>
          <SleepTracker />
        </div>
      </div>

      <div className="mt-8">
        <select
          id="uebersicht"
          name="uebersicht"
          onChange={handleNavigation}
          className="border border-gray-300 rounded px-4 py-2"
        >
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
