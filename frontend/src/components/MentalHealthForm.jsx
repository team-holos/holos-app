import { useState } from "react";

function MentalHealthForm() {
  const [textarea, setTextarea] = useState("Dein persönliches Journal....");

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  return (
    <form>
      <textarea
        value={textarea}
        onChange={handleChange}
        className="border w-full rounded mt-4 font-extralight"
      />
    </form>
  );
}

export default MentalHealthForm;
