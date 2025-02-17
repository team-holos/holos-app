// import { useState } from "react";
// import Nutrition from "./NutritionPage";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import WaterTracker from "../components/WaterTracker";
// import { Menu } from "lucide-react";


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
          console.log("neueSchritte");
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
  console.log("Schritte:", steps);

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Welcome User!</h1>
      <ul className="list-disc list-inside">
        <li>Tagesübersicht</li>
        <li>Ziel für heute</li>
      </ul>


      <div>
        Schritte: {steps} / {goalSteps}
        <div style={{ width: `${progress}%`, height: '20px', backgroundColor: 'green' }}></div>
      </div>

      {/* Eingabefeld für das Ziel */}
      <label htmlFor="goal">Ziel:</label>
      <input
        type="number"
        id="goal"
        value={goalSteps}
        onChange={handleGoalChange}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={simulationActiv ? stopSimulation : startSimulation}
          style={{ border: '1px solid #ccc', padding: '5px 10px', borderRadius: '5px' }}
        >
          {simulationActiv ? "Stopp" : "Start"}
        </button>
      </div>

      <WaterTracker />

      <form className="flex items-center mt-16">
        {/* <label htmlFor="shortcuts" className="inline-block">
          <Menu />
        </label> */}
        <select id="uebersicht" name="uebersicht" onChange={handleNavigation}>
          <option value="">Nächste Aufgabe...</option>
          <option value="/nutrition" className="inline-block">
            Ernährung
          </option>
          <option value="/fitness">Fitness</option>
          <option value="/mentalhealth">Mentale Gesundheit</option>
          <option value="/relaxation">Entspannung</option>
          <option value="/settings">Einstellungen</option>
        </select>
      </form>
    </div>
  );
}

export default DashboardPage;
