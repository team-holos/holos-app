import { useState } from "react";
import MoodForm from "../components/MoodForm";
import SleepQualityForm from "../components/SleepQualityForm";

function RelaxationPage() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Eingabe gespeichert!");
    console.log(inputs);
  };
  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-2">Erholung</h1>
      {/* <ul className="list-disc list-inside p-2 my-2">
        <li>Smart-Alarm</li>
      </ul> */}
      <h3 className="font-bold">Schlafanalyse-Dashboard</h3>
      <form onSubmit={handleSubmit} className="p-2 my-2 flex flex-col">
        <label>
          Einschlafzeit:
          <input
            type="number"
            name="fallAsleep"
            value={inputs.fallAsleep || ""}
            onChange={handleChange}
            className="border rounded m-4 p-1"
          /> Uhr
        </label>
        <label>
          Aufwachzeit:
          <input
            type="number"
            name="wakeup"
            value={inputs.wakeup || ""}
            onChange={handleChange}
            className="border rounded m-4 p-1"
          /> Uhr
        </label>
      </form>
      <div className="p-2 my-4">
        <SleepQualityForm />
        <MoodForm />
        <button onClick={handleSubmit}>
          <input type="submit" className="p-2 my-2 mt-10 border rounded cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default RelaxationPage;