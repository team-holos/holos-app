import React, { useState, useEffect } from 'react';
import sqlite3 from 'sqlite3'; 

function NutritionPlanData() {
    const [planData, setPlanData] = useState([]);

    useEffect(() => {
        const db = new sqlite3.Database('database.db'); // Platzhalter !

        db.all('SELECT * FROM NutritionPlan', [], (err, rows) => { 
            if (err) {
                console.error(err);
            } else {
                setPlanData(rows); 
            }
        });

        db.close(); 
    }, []);

    return planData;
}

export default NutritionPlanData;