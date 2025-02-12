import React, { useState } from 'react';
import NutritionPlan from '../components/NutritionPlan';
// import NutritionPlanData from '../components/NutritionPlanData';
import NutritionPlanData from '../components/NutritionPlanData';


function NutritionPage() {
    const [plan, setPlan] = useState(NutritionPlanData);
    return(
        <div className="text-[#2D336B] p-4 my-4">
        <h1 className="text-2xl mb-4">Ernährung</h1>
        <ul className="list-disc list-inside">
            <li>Ernährungsplan</li>
            <li>KI-basierende Rezeptempfehlungen</li>
        </ul>

        <NutritionPlan plan={plan} />
    </div>

)}
export default NutritionPage;