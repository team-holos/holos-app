import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SleepTrackerRelax from "../components/SleepTrackerRelax";
import AlarmClock from "../components/AlarmClock";

const RelaxationPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventText, setEventText] = useState("");
    const [events, setEvents] = useState({});

    useEffect(() => {
        const storedEvents = localStorage.getItem("calendarEvents");
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(events));
    }, [events]);

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

    const handleSleepDataSaved = (sleepData) => {
        if (sleepData) {
            const dateString = new Date().toDateString();
            const eventText = `Schlaf: ${sleepData.duration}, Qualität: ${sleepData.sleepQuality}, Stimmung: ${sleepData.mood}`;
            setEvents({
                ...events,
                [dateString]: [...(events[dateString] || []), eventText],
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-purple-200 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-semibold text-indigo-800">Entspannungsseite</h1>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 flex-1">
                        <SleepTrackerRelax onSleepDataSaved={handleSleepDataSaved} />
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 flex-1">
                        <AlarmClock />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kalender</h2>
                    <Calendar onClickDay={handleDateClick} className="w-full" />
                    {selectedDate && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Ereignis hinzufügen</h3>
                            <p className="mb-4 text-gray-600">Datum: {selectedDate.toDateString()}</p>
                            <textarea
                                value={eventText}
                                onChange={handleEventTextChange}
                                className="border rounded-md p-3 w-full mb-6 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ereignis eingeben"
                            />
                            <button
                                onClick={addEvent}
                                className="px-6 py-3 bg-[#7886C7] text-white rounded-md hover:bg-[#5A69A7] transition duration-300"
                            >
                                Hinzufügen
                            </button>
                        </div>
                    )}
                    {selectedDate && events[selectedDate.toDateString()] && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Ereignisse</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {events[selectedDate.toDateString()].map((event, index) => (
                                    <li key={index} className="mb-2">
                                        {event}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RelaxationPage;