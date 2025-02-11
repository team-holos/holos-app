// import { useState } from "react";
// import Nutrition from "./NutritionPage";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const handleNavigation = (event) => {
    navigate(event.target.value);
  };
  return (
    <div>
      <ul>
        <li>
          <h1>Welcome User!</h1>
        </li>
        <li>Tagesübersicht</li>
        <li>Ziel für heute</li>
      </ul>

      <form className="flex items-center">
        {/* <label htmlFor="shortcuts" className="inline-block">
          <Menu />
        </label> */}
        <select id="uebersicht" name="uebersicht" onChange={handleNavigation}>
          <option value="">Nächste Aufgabe...</option>
          <option value="/nutrion" className="inline-block">
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
