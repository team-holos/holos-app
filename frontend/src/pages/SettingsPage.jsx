function SettingsPage() {
  const handleSave = () => {
    alert("Einstellungen gespeichert");
  };

  const handleReset = () => {
    alert("Einstellungen zurückgesetzt");
  };

  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Einstellungen</h1>
      <ul className="list-disc list-inside">
        <li>Persönliche Daten</li>
        <li>Gesundheitsziele</li>
        <li>Benachrichtungseinstellungen</li>
      </ul>

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
