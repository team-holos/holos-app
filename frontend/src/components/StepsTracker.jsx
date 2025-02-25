import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function SleepTrackerRelax() {
  const [fallAsleep, setFallAsleep] = useState("");
  const [wakeup, setWakeup] = useState("");
  const [sleepData, setSleepData] = useState(null);
  const [error, setError] = useState("");
  const [sleepDuration, setSleepDuration] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSleepDuration(null);

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
    setSleepDuration(calculateSleepDuration(fallAsleepMinutes, wakeupMinutes));
  };

  const chartData = sleepData
    ? {
        labels: ["Schlafzeiten"],
        datasets: [
          {
            label: "Einschlafzeit",
            data: [parseTime(sleepData.fallAsleep)],
            backgroundColor: "rgba(54, 162, 235, 0.8)",
          },
          {
            label: "Aufwachzeit",
            data: [parseTime(sleepData.wakeup)],
            backgroundColor: "rgba(255, 99, 132, 0.8)",
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
      x: {
        title: {
          display: true,
          text: "Zeit",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
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

  function calculateSleepDuration(fallAsleepMinutes, wakeupMinutes) {
    let duration = wakeupMinutes - fallAsleepMinutes;
    if (duration < 0) {
      duration += 24 * 60;
    }
    return duration;
  }

  function formatSleepDuration(durationMinutes) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours} Stunden und ${minutes} Minuten`;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Schlaf-Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Einschlafzeit:
          <input
            type="time"
            value={fallAsleep}
            onChange={(e) => setFallAsleep(e.target.value)}
            placeholder="--:--"
          />
        </label>
        <label>
          Aufwachzeit:
          <input
            type="time"
            value={wakeup}
            onChange={(e) => setWakeup(e.target.value)}
            placeholder="--:--"
          />
        </label>
        <button type="submit" style={{ margin: "10px" }}>
          Diagramm anzeigen
        </button>
        <button type="submit">Senden</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {chartData && <Bar data={chartData} options={chartOptions} />}
      {sleepDuration !== null && (
        <p>Schlafdauer: {formatSleepDuration(sleepDuration)}</p>
      )}
    </div>
  );
}

export default SleepTrackerRelax;