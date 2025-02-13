import { useState } from "react";
import MoodForm from "../components/MoodForm";

function RelaxationPage() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };
  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Erholung</h1>
      <ul className="list-disc list-inside">
        <li>Smart-Alarm</li>
        <li>Schlafanalyse-Dashboard</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Einschlafzeit:
          <input
            type="number"
            name="fallasleep"
            value={inputs.fallasleep || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Aufwachzeit:
          <input
            type="number"
            name="wakeuptime"
            value={inputs.wakuptime || ""}
            onChange={handleChange}
          />
        </label>

        <input type="submit" />
      </form>
      <MoodForm />    
    </div>
  );
}

export default RelaxationPage;
