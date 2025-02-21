import React, { useState } from 'react';
import NutritionPlan from '../components/NutritionPlan';
import NutritionPlanData from '../components/NutritionPlanData';

function NutritionPage() {
    const [plan, setPlan] = useState(NutritionPlanData);
    const [showPlan, setShowPlan] = useState(false);

    const togglePlanVisibility = () => {
        setShowPlan(!showPlan);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5em'
        }}>
            <h1 style={{
                fontSize: '3em'
            }}>
                Alles rund um deine Ernährung
            </h1>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                marginTop: '20px' // Abstand zwischen Überschrift und Buttons
            }}>
                <button
                    style={{
                        backgroundColor: '#A9B5DF',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '10px' // Abstand zwischen den Buttons
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
                        cursor: 'pointer'
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