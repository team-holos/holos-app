const NutritionPlanData = [
  {
    id: 1,
    name: "Standard-Ernährungsplan",
    description: "Ein ausgewogener Ernährungsplan für den Durchschnittsbürger.",
    days: [
      {
        day: "Montag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Haferflocken", "Beeren", "Nüsse", "Milch"],
            calories: 380,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Hähnchenbrust", "Salat", "Tomaten", "Gurke"],
            calories: 450,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Lachs", "Quinoa", "Brokkoli"],
            calories: 500,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Apfel", "Mandeln"],
            calories: 150,
            category: "Snack",
          },
        ],
      },
      {
        day: "Dienstag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Joghurt", "Banane", "Honig"],
            calories: 320,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Linsensuppe", "Vollkornbrot"],
            calories: 400,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Tofu", "Gemüsepfanne", "Reis"],
            calories: 480,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Karottensticks", "Hummus"],
            calories: 120,
            category: "Snack",
          },
        ],
      },
      {
        day: "Mittwoch",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Vollkorntoast", "Avocado", "Ei"],
            calories: 350,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Thunfischsalat", "Brot"],
            calories: 420,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Hähnchen-Curry", "Reis"],
            calories: 550,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Nüsse", "Trockenfrüchte"],
            calories: 180,
            category: "Snack",
          },
        ],
      },
      {
        day: "Donnerstag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Müsli", "Milch", "Obst"],
            calories: 300,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Quinoa-Salat", "Gemüse"],
            calories: 400,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Rinderhackfleisch", "Süßkartoffeln", "Bohnen"],
            calories: 600,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Joghurt", "Beeren"],
            calories: 150,
            category: "Snack",
          },
        ],
      },
      {
        day: "Freitag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Smoothie", "Spinat", "Banane", "Milch"],
            calories: 350,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Wraps", "Hähnchen", "Gemüse"],
            calories: 450,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Pizza", "selbstgemacht"],
            calories: 700,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Obst"],
            calories: 100,
            category: "Snack",
          },
        ],
      },
      {
        day: "Samstag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Rührei", "Toast", "Käse"],
            calories: 400,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Burger", "Pommes"],
            calories: 800,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Pasta", "Tomatensoße", "Parmesan"],
            calories: 600,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Eis"],
            calories: 200,
            category: "Snack",
          },
        ],
      },
      {
        day: "Sonntag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Pfannkuchen", "Ahornsirup", "Obst"],
            calories: 500,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Salat", "Lachs", "Dressing"],
            calories: 450,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Sonntagsbraten", "Kartoffeln", "Gemüse"],
            calories: 750,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Schokolade"],
            calories: 150,
            category: "Snack",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Vegetarischer Ernährungsplan",
    description: "Ein Plan ohne Fleisch und Fisch.",
    days: [
      {
        day: "Montag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Joghurt", "Obst", "Nüsse"],
            calories: 350,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Gemüse-Curry", "Reis"],
            calories: 450,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Linsen-Eintopf", "Brot"],
            calories: 500,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Apfel", "Mandeln"],
            calories: 150,
            category: "Snack",
          },
        ],
      },
      {
        day: "Dienstag",
        meals: [
          {
            name: "Frühstück",
            ingredients: ["Smoothie", "Beeren", "Spinat"],
            calories: 320,
            category: "Frühstück",
          },
          {
            name: "Mittagessen",
            ingredients: ["Salat", "Käse", "Nüsse"],
            calories: 400,
            category: "Mittagessen",
          },
          {
            name: "Abendessen",
            ingredients: ["Vegetarische Lasagne"],
            calories: 480,
            category: "Abendessen",
          },
          {
            name: "Snack",
            ingredients: ["Karottensticks", "Hummus"],
            calories: 120,
            category: "Snack",
          },
        ],
      },
       {
        day: "Mittwoch",
        meals