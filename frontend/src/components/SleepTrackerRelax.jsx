import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function SleepTracker() {
  const [fallAsleep, setFallAsleep] = useState('');
  const [wakeup, setWakeup] = useState('');
  const [sleepData, setSleepData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
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
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  }

  function formatTime(timeValue) {
    const hours = Math.floor(timeValue);
    const minutes = Math.round((timeValue - hours) * 60);
    return `<span class="math-inline">\{hours\}\:</span>{minutes < 10 ? '0' : ''}${minutes}`;
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
      {chartData && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
}

export default SleepTracker;