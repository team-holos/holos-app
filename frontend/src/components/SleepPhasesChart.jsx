import React from "react";
import { Bar } from "react-chartjs-2";

const SleepPhasesChart = ({ sleepPhases }) => {
  const chartData = {
    labels: sleepPhases.map((phase) => `${phase.start} - ${phase.end}`),
    datasets: [
      {
        label: "Schlafphasen",
        data: sleepPhases.map(() => 1),
        backgroundColor: sleepPhases.map((phase) => {
          if (phase.type === "Leichtschlaf") return "rgba(54, 162, 235, 0.5)";
          if (phase.type === "Tiefschlaf") return "rgba(75, 192, 192, 0.5)";
          if (phase.type === "REM-Schlaf") return "rgba(255, 206, 86, 0.5)";
          return "rgba(200, 200, 200, 0.5)";
        }),
        borderColor: sleepPhases.map((phase) => {
          if (phase.type === "Leichtschlaf") return "rgba(54, 162, 235, 1)";
          if (phase.type === "Tiefschlaf") return "rgba(75, 192, 192, 1)";
          if (phase.type === "REM-Schlaf") return "rgba(255, 206, 86, 1)";
          return "rgba(150, 150, 150, 1)";
        }),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const calculateAverageSleepTime = () => {
    
    return "7 Stunden 30 Minuten";
  };

  return (
    <div className="text-center">
      <p className="text-lg font-semibold mb-2">
        Durchschnittliche Schlafzeit: {calculateAverageSleepTime()}
      </p>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SleepPhasesChart;