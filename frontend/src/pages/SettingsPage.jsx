import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("de");
  const [pendingLanguage, setPendingLanguage] = useState("de");

  const handleSave = () => {
    i18n.changeLanguage(pendingLanguage);
    setLanguage(pendingLanguage);
    alert(t("save"));
  };

  const handleReset = () => {
    setTheme("light");
    setPendingLanguage("de");
    i18n.changeLanguage("de");
    setLanguage("de");
    alert(t("reset"));
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setPendingLanguage(e.target.value);
  };

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">{t("settings")}</h1>
      <ul className="list-disc list-inside">
        <li>{t("personalData")}</li>
        <li>{t("healthGoals")}</li>
        <li>{t("notificationSettings")}</li>
      </ul>

      <div className="mt-6">
        <label htmlFor="theme-select" className="block mb-2">
          {t("theme")}
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="light">{t("light")}</option>
          <option value="dark">{t("dark")}</option>
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="language-select" className="block mb-2">
          {t("language")}
        </label>
        <select
          id="language-select"
          value={pendingLanguage}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {t("save")}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          {t("reset")}
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
