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
      <div className="mt-8">
        <section className="max-w-md mx-auto bg-[#FFF2F2] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#2D336B]">{t("Passwortänderung")}</h2>
          <form className="space-y-6" onSubmit={handlePasswordChange}>
            <div>
              <label htmlFor="old-password" className="block text-sm font-medium text-[#2D336B]">{t("Altes Passwort")}</label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-[#A9B5DF] rounded-md shadow-sm focus:ring-[#2D336B] focus:border-[#2D336B] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-[#2D336B]">{t("Neues Passwort")}</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-[#A9B5DF] rounded-md shadow-sm focus:ring-[#2D336B] focus:border-[#2D336B] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-[#2D336B]">{t("Passwort bestätigen")}</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-[#A9B5DF] rounded-md shadow-sm focus:ring-[#2D336B] focus:border-[#2D336B] sm:text-sm"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-[#2D336B] text-white px-4 py-2 rounded-md hover:bg-[#7886C7] transition"
              >
                {t("save")}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#A9B5DF] text-[#2D336B] px-4 py-2 rounded-md hover:bg-[#7886C7] transition"
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
