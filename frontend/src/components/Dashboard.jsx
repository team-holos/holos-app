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
            <label for="shortcuts">"Menu"</label>
            <select id="uebersicht" name="uebersicht">
            <option value="ernaehrung" name="ernaehrung">Ernährung</option>
            <option value="fitness" name="fitness">Fitness</option>
            <option value="mentale Gesundheit" name="mentale Gesundheit">Mentale Gesundheit</option>
            <option value="entspannung" name="entspannung">Entspannung</option>
            </select>
        </form> 
    </div>
);
}


export default Dashboard;