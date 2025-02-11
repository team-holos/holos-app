import React, { useState } from 'react';
import NutritionPlan from '../components/NutritionPlan';
import Nutritionplan from './NutritionPlanData'


function NutritionPage() {
    const [plan, setPlan] = useState(Nutritionplan);
    return(
        <>
        <h1>Ernährung</h1>
        <ul>
            <li>Ernährungsplan</li>
            <li>KI-basierende Rezeptempfehlungen</li>
        </ul>
        <NutritionPlan plan={plan} />
        </>
        
    );
}
export default NutritionPage;