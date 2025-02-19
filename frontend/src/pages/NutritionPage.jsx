import React, { useState, useEffect } from "react";
import NutritionPlan from "../components/NutritionPlan";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

function NutritionPage() {
  const [nutritionData, setNutritionData] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const endpoint = `${API_URL}/api/nutrition`;
      console.log("Fetching from:", endpoint);

      try {
        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Received nutrition data:", data);

        setNutritionData(data);
        if (data.length > 0) {
          setSelectedPlanId(data[0].id); // Select first plan by default
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
        setErrorMessage(`Fehler: ${error.message}`);
      }
    };

    fetchNutritionData();
  }, []);

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  if (nutritionData.length === 0) {
    return <div>Lädt...</div>;
  }

  const planId = selectedPlanId !== null ? selectedPlanId : nutritionData[0].id;
  const selectedPlan = nutritionData.find((plan) => plan.id === planId);

  return (
    <div className="text-[#A9B5DF] p-4 my-4">
      <h1 className="text-2xl mb-4">Ernährung</h1>

      <select value={planId} onChange={(e) => setSelectedPlanId(parseInt(e.target.value, 10))}>
        {nutritionData.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.name}
          </option>
        ))}
      </select>

      {selectedPlan ? <NutritionPlan plan={selectedPlan} /> : <div>Bitte wähle einen Ernährungsplan aus.</div>}
    </div>
  );
}

export default NutritionPage;