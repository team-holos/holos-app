import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "holos.db");
console.log("Using database at:", dbPath);

const db = new Database(dbPath);

// Create users table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      birthday TEXT,
      weight REAL,
      gender TEXT
  )
`
).run();

// Create nutrition table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS nutrition (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      meals TEXT NOT NULL -- Stored as a JSON string
  )
`
).run();

// default nutrition plans if table is empty
const checkPlans = db.prepare("SELECT COUNT(*) AS count FROM nutrition").get();

if (checkPlans.count === 0) {
  const insertPlan = db.prepare(
    "INSERT INTO nutrition (name, description, meals) VALUES (?, ?, ?)"
  );

  insertPlan.run(
    "Low Carb Plan",
    "A low-carb diet for weight loss.",
    JSON.stringify(["Omelette", "Chicken Salad", "Steak & Veggies"])
  );

  insertPlan.run(
    "Muscle Gain Plan",
    "High protein for muscle building.",
    JSON.stringify(["Protein Shake", "Grilled Chicken", "Rice & Veggies"])
  );

  insertPlan.run(
    "Balanced Plan",
    "A well-balanced diet with all macronutrients.",
    JSON.stringify(["Oatmeal", "Grilled Fish", "Quinoa & Veggies"])
  );

  console.log("Inserted default nutrition plans into database.");
}

export default db;