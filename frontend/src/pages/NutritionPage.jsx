import React, { useState } from 'react';
import NutritionPlan from '../components/NutritionPlan';
import NutritionPlanData from '../components/NutritionPlanData';

function NutritionPage() {
    const [plan, setPlan] = useState(NutritionPlanData);
    const [showPlan, setShowPlan] = useState(false);

    const togglePlanVisibility = () => {
        setShowPlan(!showPlan);
    }; // Hier war die schließende Klammer } vergessen!

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{
                fontSize: '3em',
                marginBottom: '2em'
            }}>
                Alles rund um deine Ernährung
            </h1>
            <div>
                <button
                    style={{
                        backgroundColor: '#A9B5DF',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={togglePlanVisibility}
                >
                    {showPlan ? 'Ernährungsplan ausblenden' : 'Erstelle deinen Ernährungsplan'}
                </button>
                <button
                    style={{
                        backgroundColor: '#A9B5DF',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '10px'
                    }}
                >
                    Ernährungstipps
                </button>
            </div>
            {showPlan && <NutritionPlan plan={plan} />}
        </div>
    );
}

export default NutritionPage;