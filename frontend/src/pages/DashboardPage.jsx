import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tagesübersicht from "../components/Tagesübersicht";
import WaterTracker from "../components/WaterTracker";
import StepsTracker from "../components/StepsTracker";
import { Footprints, Droplet } from "lucide-react";

function DashboardPage() {
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

  const handleGoalChange = (event) => {
    setGoalSteps(parseInt(event.target.value, 10) || 0);
  };

  return (
    <div className="font-roboto text-[#2D336B] p-4 my-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Willkommen, {username}!</h1>

      {/* Tagesübersicht Section */}
      <Tagesübersicht />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Steps Tracker (Replaces old sleep tracker) */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium flex items-center">
              <Footprints className="w-5 h-5 mr-2" />
              Schritte
            </span>
          </div>
          <StepsTracker goalSteps={goalSteps} onGoalChange={handleGoalChange} />
        </div>

        {/* Water Tracker (Unchanged) */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium flex items-center">
              <Droplet className="w-5 h-5 mr-2" />
              Wasser
            </span>
          </div>
          <WaterTracker />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
