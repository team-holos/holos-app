import { useState } from "react";

function MentalHealthForm() {
  const defaultMessage = "Dein persönliches Journal....";
  const [textarea, setTextarea] = useState(defaultMessage);

  const handleSave = (event) => {
    event.preventDefault();
    alert("Einstellungen gespeichert");
    setTextarea("");
  };

  const handleChange = (event) => {
    if (event.target.value === defaultMessage) {
      setTextarea(event.target.value);
    } else {
      setTextarea(event.target.value);
    }
  };

  return (
    <form>
      <textarea
        value={textarea}
        onFocus={() => {if (textarea === defaultMessage) 
          {setTextarea("");}
          }}
        onChange={handleChange}
        className="border p-2 my-2 w-full rounded mt-4 font-extralight"
      />
      <button
        onClick={handleSave}
        className="text-xs p-2 border rounded cursor-pointer bg-[#2D336B] text-[#FFF2F2]"
      >
        Speichern
      </button>
    </form>
  );
}

export default MentalHealthForm;