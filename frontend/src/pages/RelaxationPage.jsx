import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SleepTrackerRelax from "../components/SleepTrackerRelax";
import AlarmClock from "../components/AlarmClock";
import SoundPlayer from "../components/SoundPlayer";

const RelaxationPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState({});

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventTextChange = (event) => {
    setEventText(event.target.value);
  };

  const addEvent = () => {
    if (selectedDate && eventText.trim() !== "") {
      const dateString = selectedDate.toDateString();
      setEvents({
        ...events,
        [dateString]: [...(events[dateString] || []), eventText],
      });
      setEventText("");
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
            <div className="p-6 bg-purple-50 rounded-xl shadow-md md:col-start-2">
              <AlarmClock />
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-md">
              <SoundPlayer />
            </div>
            <div className="col-span-3 p-6 bg-green-50 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Kalender</h2>
              <Calendar onClickDay={handleDateClick} />
              {selectedDate && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Ereignis hinzufügen</h3>
                  <p className="mb-2">Datum: {selectedDate.toDateString()}</p>
                  <textarea
                    value={eventText}
                    onChange={handleEventTextChange}
                    className="border rounded-md p-2 w-full mb-4"
                    placeholder="Ereignis eingeben"
                  />
                  <button onClick={addEvent} className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                    Hinzufügen
                  </button>
                </div>
              )}
              {selectedDate && events[selectedDate.toDateString()] && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Ereignisse</h3>
                  <ul>
                    {events[selectedDate.toDateString()].map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaxationPage;