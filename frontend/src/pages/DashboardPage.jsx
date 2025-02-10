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
                <label for="shortcuts">"Menu"</label>
                <select id="uebersicht" name="uebersicht" onChange={handleNavigation}>
                    <option value="">Select a page...</option>
                    <option value="/NutritionPage">Ernährung</option>
                    <option value="/Fitness">Fitness</option>
                    <option value="/MentalHealth">Mentale Gesundheit</option>
                    <option value="/Relaxation">Entspannung</option>
                </select>
            </form>
        </div>
    );
}


export default DashboardPage;
