import React, { useState } from "react";

function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("de");

  const handleSave = () => {
    alert("Einstellungen gespeichert");
  };

  const handleReset = () => {
    setTheme("light");
    setLanguage("de");
    alert("Einstellungen zurückgesetzt");
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Einstellungen</h1>
      <ul className="list-disc list-inside">
        <li>Persönliche Daten</li>
        <li>Gesundheitsziele</li>
        <li>Benachrichtungseinstellungen</li>
      </ul>
      <div className="mt-6">
        <label htmlFor="theme-select"></label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="light">Light</option>
          <option value="dark">Dark NYI</option>
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="language-select">Sprache: </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Speichern
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
