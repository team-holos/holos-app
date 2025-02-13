function SettingsPage() {
    const handleSave = () => {
        alert('Einstellungen gespeichert');
    };

    const handleReset = () => {
        alert('Einstellungen zurückgesetzt');
    };



    return (
        <div className="text-[#2D336B] p-4 my-4">
        <h1 className="text-2xl mb-4">Einstellungen</h1>
        <ul className="list-disc list-inside">
            <li>Persönliche Daten</li>
            <li>Gesundheitsziele</li>
            <li>Benachrichtungseinstellungen</li>
        </ul>
        </div>

    );
}

export default SettingsPage;