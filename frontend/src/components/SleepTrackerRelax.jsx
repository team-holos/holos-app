import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function SleepTrackerRelax() {
  const [fallAsleep, setFallAsleep] = useState("");
  const [wakeup, setWakeup] = useState("");
  const [sleepData, setSleepData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); 

    if (!fallAsleep || !wakeup) {
      setError("Bitte füllen Sie beide Felder aus.");
      return;
    }

    const fallAsleepMinutes = timeToMinutes(fallAsleep);
    const wakeupMinutes = timeToMinutes(wakeup);

    if (wakeupMinutes <= fallAsleepMinutes) {
      setError("Die Aufwachzeit muss nach der Einschlafzeit liegen.");
      return;
    }

    setSleepData({ fallAsleep, wakeup });
  };

  const chartData = sleepData
    ? {
        labels: ["Schlafzeiten"],
        datasets: [
          {
            label: "Einschlafzeit",
            data: [parseTime(sleepData.fallAsleep)],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
          {
            label: "Aufwachzeit",
            data: [parseTime(sleepData.wakeup)],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }
    : null;

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            return formatTime(value);
          },
        },
      },
    },
  };

  function parseTime(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours + minutes / 60;
  }

  function formatTime(timeValue) {
    const hours = Math.floor(timeValue);
    const minutes = Math.round((timeValue - hours) * 60);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  return (
    <div>
      <h1>Schlaf-Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Einschlafzeit:
          <input
            type="time"
            value={fallAsleep}
            onChange={(e) => setFallAsleep(e.target.value)}
          />
        </label>
        <label>
          Aufwachzeit:
          <input
            type="time"
            value={wakeup}
            onChange={(e) => setWakeup(e.target.value)}
          />
        </label>
        <button type="submit">Diagramm anzeigen</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {chartData && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
}

export default SleepTrackerRelax;