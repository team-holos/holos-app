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
        className="border p-2 my-2 w-full rounded mt-4 font-extralight"
      />
      <button>
        <input
          type="submit"
          className="p-2 border rounded cursor-pointer"
        />
      </button>
    </form>
  );
}

export default MentalHealthForm;
