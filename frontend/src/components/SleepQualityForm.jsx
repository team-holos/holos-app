import { useState } from "react";

function SleepQualityForm() {
    const [myMood, setMyMood] = useState("durchgeschlafen");
  
    const handleChange = (event) => {
      setMyMood(event.target.value)
    }
  
    return (
      <form>
        <label>Wie war Deine Schlafqualität:</label>
        <select value={myMood} onChange={handleChange} className="m-4 border rounded bg-[#FFF2F2]">
          <option value="sleepthrough">durchgeschlafen</option>
          <option value="sleepbreaks">mit Unterbrechungen</option>
          <option value="restless">unruhig</option>
          <option value="sleepless">schlaflos</option>
        </select>
      </form>
    )
  }

  export default SleepQualityForm;