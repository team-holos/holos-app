import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL.endsWith("/")
  ? import.meta.env.VITE_API_URL.slice(0, -1)
  : import.meta.env.VITE_API_URL;


function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("de");
  const [pendingLanguage, setPendingLanguage] = useState("de");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert(t("Passwörter stimmen nicht überein"));
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        alert(t("Passwort erfolgreich geändert"));
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(t("Passwortänderung fehlgeschlagen"));
      }
    } catch (error) {
      console.error("Fehler beim Ändern des Passworts:", error);
      alert(t("Passwortänderung fehlgeschlagen"));
    }
  };

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">{t("settings")}</h1>
      <ul className="list-disc list-inside">
        <li>{t("personalData")}</li>
        <li>{t("healthGoals")}</li>
        <li>{t("notificationSettings")}</li>
        <li>{t("passwordChange")}</li>
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
      <div>
        <section>
          <h2 className="text-xl mb-4 max-w-sm and mx-auto">{t("passwordChange")}</h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handlePasswordChange}>
            <div>
              <label htmlFor="old-password">{t("Altes Passwort")}</label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="new-password">{t("Neues Passwort")}</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="confirm-password">{t("Passwort bestätigen")}</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {t("save")}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                {t("reset")}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
