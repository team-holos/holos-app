import { useState } from "react";

function MoodForm() {
    const [myMood, setMyMood] = useState("Erholt");
  
    const handleChange = (event) => {
      setMyMood(event.target.value)
    }
  
    return (
      <form>
        <label>Wähle aus, wie Du Dich fühlst:</label>
        <select value={myMood} onChange={handleChange} className="m-4 border rounded bg-[#FFF2F2]">
          <option value="Erholt">Erholt</option>
          <option value="Energie">Voller Energie</option>
          <option value="Müde">Müde</option>
          <option value="Erschöpft">Noch erschöpft</option>
        </select>
      </form>
    )
  }

  export default MoodForm;