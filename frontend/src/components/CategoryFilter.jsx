import React from "react";

function CategoryFilter() {
    return (
        <div>
            <label htmlFor="category">Kategorie:</label>
            <select id="category">
                <option value="all">Alle</option>
                <option value="legDay">Leg Day</option>
                <option value="upperBody">Upper Body</option>
                <option value="fullBody">Full Body</option>
                <option value="cardio">Cardio</option>
                <option value="pilates">Pilates</option>
            </select>
        </div>
    );
}

export default CategoryFilter;