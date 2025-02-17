// import { useState } from "react";
// import Nutrition from "./NutritionPage";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { Menu } from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const [schritte, setSchritte] = useState(0);
  const [zielSchritte, setZielSchritte] = useState(10000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSchritte((prevSchritte) => {
        const neueSchritte = Math.min(prevSchritte + Math.floor(Math.random() * 500), zielSchritte);
        console.log("neueSchritte");
        return neueSchritte;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (event) => {
    navigate(event.target.value);
  };

  const handleZielChange = (event) => {
    setZielSchritte(parseInt(event.target.value, 10) || 0);
  };

  const fortschritt = (schritte / zielSchritte) * 100;
  console.log("Schritte:", schritte);

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Welcome User!</h1>
      <ul className="list-disc list-inside">
        <li>Tagesübersicht</li>
        <li>Ziel für heute</li>
      </ul>

      <div>
        Schritte: {schritte} / {zielSchritte}
        <div style={{ width: `${fortschritt}%`, height: '20px', backgroundColor: 'green' }}></div>
      </div>

      {/* Eingabefeld für das Ziel */}
      <label htmlFor="ziel">Ziel:</label>
      <input
        type="number"
        id="ziel"
        value={zielSchritte}
        onChange={handleZielChange}
      />

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
