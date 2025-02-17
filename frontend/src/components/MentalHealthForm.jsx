import { useState } from "react";

function MentalHealthForm() {
  const [textarea, setTextarea] = useState("Dein persönliches Journal....");
  const handleSave = () => {
    alert("Einstellungen gespeichert");

  };

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  return (
    <form >
      <textarea
        value={textarea}
        onChange={handleChange}
        className="border p-2 my-2 w-full rounded mt-4 font-extralight"
      />
      <button onClick={handleSave} className="text-xs p-2 border rounded cursor-pointer  bg-[#2D336B] text-[#FFF2F2]">
        Speichern
      </button>
    </form>
  );
}

export default MentalHealthForm;
