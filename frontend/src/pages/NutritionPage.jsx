import React, { useState } from 'react';


function NutritionPage() {

    return (
        <div>
            <h1>Ernährung</h1>
            <p>Hallo, diese Seite wird den Ernährungsplan anzeigen.</p>
            </div>
    );
}
   /* const [plan, setPlan] = useState(NutritionPlanData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState(foodData);;
    const [portion, setPortion] = useState(1); // Standardmäßig eine Portion

    // Beispiel-Lebensmitteldaten (durch Datenbank / API-Abfrage ersetzten)
    const foodData = [
        { name: 'Apfel', kalorien: 95, protein: 0.3, kohlenhydrate: 25, fett: 0.3 },
        { name: 'Banane', kalorien: 105, protein: 1.3, kohlenhydrate: 27, fett: 0.2 },
        { name: 'Hähnchenbrust (100g)', kalorien: 165, protein: 31, kohlenhydrate: 0, fett: 3.6 },
        
    ];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFoodSelect = (food) => {
        setSelectedFood(food);
    };

    const handlePortionChange = (event) => {
        setPortion(parseInt(event.target.value) || 1); // Stellt sicher, dass die Eingabe eine Zahl ist
    };

    const calculateNutrients = () => {
        if (selectedFood) {
            const { kalorien, protein, kohlenhydrate, fett } = selectedFood;
            return {
                kalorien: kalorien * portion,
                protein: protein * portion,
                kohlenhydrate: kohlenhydrate * portion,
                fett: fett * portion,
            };
        }
        return { kalorien: 0, protein: 0, kohlenhydrate: 0, fett: 0 };
    };

    const nutrients = calculateNutrients();

    const filteredFoodData = foodData.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-[#2D336B] p-4 my-4">
            <h1 className="text-2xl mb-4">Ernährung</h1>
            <ul className="list-disc list-inside">
                <li>Ernährungsplan</li>
                <li>KI-basierende Rezeptempfehlungen</li>
            </ul>

            <NutritionPlan plan={plan} />

            {/* Suchfeld für Lebensmittel */
           /* <input
                type="text"
                placeholder="Lebensmittel suchen..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border rounded p-2 mb-2"
            />

            {/* Vorschläge für Lebensmittel */
          /*  <ul>
                {filteredFoodData.map((food) => (
                    <li
                        key={food.name}
                        onClick={() => handleFoodSelect(food)}
                        className="cursor-pointer hover:bg-gray-200 p-2"
                    >
                        {food.name}
                    </li>
                ))}
            </ul>

            {/* Anzeige der Nährwertangaben und Portionseingabe */
         /*   {selectedFood && (
                <div className="mt-4">
                    <h2 className="text-xl">Nährwerte für {selectedFood.name}</h2>
                    <p>Kalorien: {nutrients.kalorien}</p>
                    <p>Protein: {nutrients.protein}g</p>
                    <p>Kohlenhydrate: {nutrients.kohlenhydrate}g</p>
                    <p>Fett: {nutrients.fett}g</p>

                    <div className="mt-2">
                        <label htmlFor="portion">Portionen:</label>
                        <input
                            type="number"
                            id="portion"
                            value={portion}
                            onChange={handlePortionChange}
                            min="1"
                            className="border rounded p-2 ml-2 w-16"
                        />
                    </div>
                </div>
            )}
        </div>
    );
} */

export default NutritionPage;