import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SleepTrackerRelax from "../components/SleepTrackerRelax";
import AlarmClock from "../components/AlarmClock";
import SoundPlayer from "../components/SoundPlayer";

const RelaxationPage = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleAddEntry = () => {
    if (newEntry.trim() !== "") {
      const entry = {
        date: date.toDateString(),
        text: newEntry,
      };
      setEntries([...entries, entry]);
      setNewEntry("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
            Entspannungsseite
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 rounded-xl shadow-md">
              <SleepTrackerRelax />
            </div>
            <div className="p-6 bg-purple-50 rounded-xl shadow-md">
              <AlarmClock />
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-md">
              <SoundPlayer />
            </div>
            <div className="col-span-3 p-6 bg-green-50 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Kalender</h2>
              <Calendar onChange={handleDateChange} value={date} />
              <div className="mt-4">
                <input
                  type="text"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="Neuer Eintrag"
                  className="border rounded p-2 w-full mb-2"
                />
                <button
                  onClick={handleAddEntry}
                  className="bg-indigo-600 text-white py-2 px-4 rounded"
                >
                  Eintrag hinzufügen
                </button>
              </div>
              <ul className="mt-4">
                {entries
                  .filter((entry) => entry.date === date.toDateString())
                  .map((entry, index) => (
                    <li key={index} className="border rounded p-2 mb-2">
                      {entry.text}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaxationPage;