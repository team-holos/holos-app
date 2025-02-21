import React from "react";

function CategoryFilter({ onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategorie:</label>
            <label htmlFor="category">Kategorie:</label>
            <select id="category"
                onChange={e => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 sm:text-sm"
            >
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