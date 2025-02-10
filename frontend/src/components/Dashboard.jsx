import { useState } from "react";

function Dashboard() {
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
            <label for="Shortcuts">"Menu"</label>
            <select id="übersicht" name="Übersicht">
            <option value="ernährung" name="Ernährung">Ernährung</option>
            <option value="fitness" name="Fitness">Fitness</option>
            <option value="mentale Gesundheit" name="Mentale Gesundheit">Mentale Gesundheit</option>
            <option value="entspannung" name="Entspannung">Entspannung</option>
            </select>
        </form>
    </div>
);
}


export default Dashboard;