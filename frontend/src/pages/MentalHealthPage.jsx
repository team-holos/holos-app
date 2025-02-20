import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MentalHealthPage() {
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [savedDates, setSavedDates] = useState([]);

  useEffect(() => {
    fetch(`/journal/${date.toISOString().split("T")[0]}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setContent(data.content || ""));
  }, [date]);

  useEffect(() => {
    fetch("/journal/entries/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSavedDates(data));
  }, []);

  const saveJournal = () => {
    fetch("/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        date: date.toISOString().split("T")[0],
        content,
      }),
    }).then(() => alert("Eintrag gespeichert!"));
  };

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Mentale Gesundheit</h1>
      <ul className="list-disc list-inside">
        <li>Journaling</li>
        <li>Meditations-Bereich</li>
      </ul>

      {/* Journaling Section */}
      <div className="mt-6 border p-4 rounded-lg shadow-md bg-white">
        <h2 className="text-xl mb-2">Tägliches Journal</h2>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date }) =>
            savedDates.includes(date.toISOString().split("T")[0])
              ? "bg-blue-300"
              : ""
          }
        />
        <textarea
          className="w-full mt-4 p-2 border rounded-md"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Schreibe deine Gedanken hier..."
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={saveJournal}
        >
          Speichern
        </button>
      </div>
    </div>
  );
}

export default MentalHealthPage;

