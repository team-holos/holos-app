import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
          console.warn(`No journal entry found for ${localDate}, setting empty content.`);
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
            savedDates.includes(getLocalDateString(date)) ? "bg-blue-300" : ""
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

