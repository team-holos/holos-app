import React, { useState } from 'react';
import NutritionPlan from '../components/NutritionPlan';
import NutritionPlanData from '../components/NutritionPlanData';

function NutritionPage() {
    const [plan, setPlan] = useState(NutritionPlanData);
    const [showPlan, setShowPlan] = useState(false); // Zustand für die Sichtbarkeit des Plans

    const togglePlanVisibility = () => {
        setShowPlan(!showPlan); // Zustand ändern, um den Plan ein- oder auszublenden
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Zentriert den Inhalt */}
            <h1 style={{ 
                fontSize: '3em', /* Vergrößert die Überschrift */
                marginBottom: '2em' /* Vergrößert den Abstand zum Button */
            }}>
                Alles rund um deine Ernährung
            </h1>
            <button style={{
                backgroundColor: '#A9B5DF',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }} onClick={togglePlanVisibility}> {/* Klick-Ereignis hinzufügen */}
                {showPlan ? 'Ernährungsplan ausblenden' : 'Erstelle deinen Ernährungsplan'} {/* Text dynamisch ändern */}
            </button>
            {showPlan && <NutritionPlan plan={plan} />} {/* Plan nur anzeigen, wenn showPlan true ist */}
        </div>
    );
}

export default NutritionPage;