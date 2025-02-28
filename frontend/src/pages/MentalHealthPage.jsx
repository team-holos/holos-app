import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MyTimer from "../components/MyTimer";
import SoundForm from "../components/SoundForm";

// Helper function to ensure dates stay in local time
const getLocalDateString = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

function MentalHealthPage() {
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [savedDates, setSavedDates] = useState([]);
  const token = localStorage.getItem("token");
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  // time.setSeconds(time.getSeconds() + 3); // 3 seconds timer to try sound effect

  // Fetch journal entry for the selected date
  useEffect(() => {
    let isMounted = true;

    if (!token) {
      console.warn("No token found. User is not authenticated.");
      return;
    }

    const localDate = getLocalDateString(date);
    console.log("Fetching entry for:", localDate);

    fetch(`/api/journal/${localDate}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (res.status === 401) {
          console.error("Unauthorized. Token might be expired.");
          return;
        }
        if (res.status === 404) {
          console.warn(
            `No journal entry found for ${localDate}, setting empty content.`
          );
          if (isMounted) setContent("");
          return;
        }
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && isMounted) {
          console.log("Received data:", data);
          setContent(data.content || "");
        }
      })
      .catch((err) => console.error("Error fetching journal entry:", err));

    return () => {
      isMounted = false;
    };
  }, [date, token]);

  // Fetch saved journal entry dates
  useEffect(() => {
    if (!token) {
      console.warn("No token found. Skipping journal fetch.");
      return;
    }

    fetch("/api/journal/entries/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Fetching saved dates, response status:", res.status);
        if (res.status === 401) {
          console.error("Unauthorized. Token might be expired.");
          return;
        }
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log("Saved dates received:", data);
          setSavedDates(data);
        }
      })
      .catch((err) => console.error("Error fetching journal dates:", err));
  }, [token]);

  // Save journal entry
  const saveJournal = () => {
    if (!token) {
      alert("You are not logged in. Please log in to save entries.");
      return;
    }

    const localDate = getLocalDateString(date);
    console.log("Saving entry for:", localDate, "Content:", content);

    fetch("/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: localDate,
        content,
      }),
    })
      .then((res) => {
        console.log("Save response status:", res.status);
        if (res.status === 401) {
          console.error("Unauthorized. Token might be expired.");
          return;
        }
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        alert("Eintrag gespeichert!");
        setSavedDates((prev) => [...new Set([...prev, localDate])]);
      })
      .catch((err) => console.error("Error saving journal:", err));
  };

  return (
    <div className="min-h-screen text-[#2D336B] bg-gray-100 py-6 flex flex-col sm:flex-row justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A9B2D8] to-[#7886C7] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-2 py-8 bg-[#E8E8E8] shadow-lg sm:rounded-3xl sm:p-6">
          {/* Journaling Section */}
          <div>
            <h2 className="text-2xl font-semibold text-center mb-8">
              Tägliches Journal
            </h2>
            <Calendar
              className="rounded"
              onChange={setDate}
              value={date}
              tileClassName={({ date }) =>
                savedDates.includes(getLocalDateString(date))
                  ? "bg-[#7886C7]"
                  : ""
              }
            />
            <textarea
              className="w-full mt-4 p-2 border rounded-md"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Schreibe deine Gedanken hier rein..."
            ></textarea>
            <button
              // className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]"
              onClick={saveJournal}
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
      <div className="relative py-3 sm:max-w-xs sm:mx-auto mt-8 sm:mt-0 flex-1">
        <div className="relative px-4 py-10 bg-[#E8E8E8] shadow-lg sm:rounded-3xl sm:p-10">
          <h2 className="text-2xl font-semibold text-center text-[#2D336B] mb-8">
            Meditations-Bereich
          </h2>
          <MyTimer expiryTimestamp={time} />
          <SoundForm />
        </div>
      </div>
    </div>
  );
}

export default MentalHealthPage;
