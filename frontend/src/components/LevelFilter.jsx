import React from 'react';

function LevelFilter({ onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level:</label>
            <label htmlFor="level">Level:</label>
            <select id="level"
                onChange={e => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 sm:text-sm"
            >
                <option value="all">Alle</option>
                <option value="beginner">Anfänger</option>
                <option value="intermediate">Fortgeschritten</option>
                <option value="advanced">Profi</option>
            </select>
        </div>
    );
}

export default LevelFilter;