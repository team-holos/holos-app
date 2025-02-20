/*import React, { useState, useEffect } from "react";
 import sqlite3 from "sqlite3";

function NutritionPlanData() {
  const [planData, setPlanData] = useState([]);
  const useDatabase = false; // Variable zum Aktivieren/Deaktivieren der Datenbankabfrage


  useEffect(() => {
    if (useDatabase) { // Nur ausführen, wenn useDatabase true ist
      // const db = new sqlite3.Database("database.db"); // Platzhalter !

      db.all("SELECT * FROM NutritionPlan", [], (err, rows) => {
        if (err) {
          console.error(err);
        } else {
          setPlanData(rows);
        }
      });

      db.close();
    } else {

      setPlanData([
        { id: 1, name: "Mahlzeit 1" },
        { id: 2, name: "Mahlzeit 2" },
      ]);
    }
  }, [useDatabase]);

  return planData;
}

export default NutritionPlanData; */