import React from "react";

function CategoryFilter({ onChange }) {
    return (
        <div>
            <label htmlFor="category">Kategorie:</label>
            <select id="category" onChange={e => onChange(e.target.value)}>
                <option value="all">Alle</option>
                <option value="legDay">Leg Day</option>
                <option value="core">Core</option>
                <option value="lowerBody">Lower Body</option>
                <option value="upperBody">Upper Body</option>
                <option value="fullBody">Full Body</option>
                <option value="cardio">Cardio</option>
                <option value="pilates">Pilates</option>
            </select>
        </div>
    );
}

export default CategoryFilter;