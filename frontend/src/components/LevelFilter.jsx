import React from 'react';

function LevelFilter({ onChange }) {
    return (
        <div>
            <label htmlFor="level">Level:</label>
            <select id="level" onChange={e => onChange(e.target.value)}>
                <option value="all">Alle</option>
                <option value="beginner">Anfänger</option>
                <option value="intermediate">Fortgeschritten</option>
                <option value="advanced">Profi</option>
            </select>
        </div>
    );
}

export default LevelFilter;