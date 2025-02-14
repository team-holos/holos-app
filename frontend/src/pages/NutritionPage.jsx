import React, { useState, useEffect } from 'react';
import NutritionPlan from '../components/NutritionPlan';

function NutritionPage() {
  const [nutritionData, setNutritionData] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    fetch('nutritionData.json')
      .then(res => res.json())
      .then(data => setNutritionData(data))
      .catch(error => console.error("Daten konnten nicht geladen werden:", error));
  }, []);

  if (nutritionData.length === 0) {
    return <div>Lädt...</div>;
  }

  const planId = selectedPlanId !== null ? selectedPlanId : nutritionData[0].id;
  const ausgewählterPlan = nutritionData.find(plan => plan.id === planId);

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Ernährung</h1>

      <select value={planId} onChange={e => setSelectedPlanId(parseInt(e.target.value, 10))}>
        {nutritionData.map(plan => (
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        ))}
      </select>

      {ausgewählterPlan ? (
        <NutritionPlan plan={ausgewählterPlan} />
      ) : (
        <div>Bitte wähle einen Ernährungsplan aus.</div>
      )}
    </div>
  );
}

export default NutritionPage;