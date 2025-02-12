import React, { useState } from 'react';
import NutritionPlan from '../components/NutritionPlan';
import NutritionPlanData from '../components/NutritionPlanData';


function NutritionPage() {
    const [plan, setPlan] = useState(NutritionPlanData);
    return(
        <>
        <h1>Ernährung</h1>
        <ul>
            <li>Ernährungsplan</li>
            <li>KI-basierende Rezeptempfehlungen</li>
        </ul>
        <NutritionPlan plan={plan} />
        <NutritionPlanData />
        </>
        
    );
}
export default NutritionPage;