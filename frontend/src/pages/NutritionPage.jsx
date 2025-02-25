import React, { useState, useEffect } from "react";
import NutritionPlan from "../components/NutritionPlan";

function NutritionPage() {
  const [plan, setPlan] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNutritionPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/nutrition/plan", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching plans: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched plans:", data);

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setPlan(data);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Abrufen der Ernährungspläne");
      setPlan([]);
    } finally {
      setLoading(false);
    }
  };

  const togglePlanVisibility = () => {
    if (!showPlan) {
      fetchNutritionPlan();
    }
    setShowPlan(!showPlan);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5em",
      }}
    >
      <h1 style={{ fontSize: "3em" }}>Alles rund um deine Ernährung</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#A9B5DF",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          onClick={togglePlanVisibility}
        >
          {showPlan
            ? "Ernährungsplan ausblenden"
            : "Erstelle deinen Ernährungsplan"}
        </button>
        <button
          style={{
            backgroundColor: "#A9B5DF",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ernährungstipps
        </button>
      </div>
      {loading && <p>Ernährungspläne werden geladen...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showPlan && <NutritionPlan plan={plan} />}{" "}
      {/* ✅ Use the component here */}
    </div>
  );
}

export default NutritionPage;
