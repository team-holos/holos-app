import React from "react";

function NutritionPlan({ plan }) {
  if (!plan || plan.length === 0) {
    return <p>Keine Ernährungspläne verfügbar.</p>;
  }

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>Dein Ernährungsplan</h2>
      <ul>
        {plan.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <ul>
              {JSON.parse(item.meals).map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NutritionPlan;
