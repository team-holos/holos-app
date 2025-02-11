import { useState } from "react";
import Nutrition from "./NutritionPage";
import { Link, useNavigate } from "react-router-dom";
function DashboardPage() {
    const navigate = useNavigate();
    const handleNavigation = (event) => {
        navigate(event.target.value)
    }
    return (


        <div>
            <ul>
                <li>
                    <h1>Welcome User!</h1>
                </li>
                <li>Tagesübersicht</li>
                <li>Ziel für heute</li>
            </ul>


            <form>
                <label htmlFor="shortcuts">Menu</label>
                <select id="uebersicht" name="uebersicht" onChange={handleNavigation}>
                    <option value="">Select a page...</option>
                    <option value="/nutrion">Ernährung</option>
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
