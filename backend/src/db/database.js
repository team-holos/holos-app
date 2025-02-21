import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "holos.db");
console.log("Using database at:", dbPath);

const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        birthday TEXT,
        weight REAL,
        gender TEXT
    );

    CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        video TEXT,
        type TEXT,
        category TEXT,
        goal TEXT,
        level TEXT,
        sets INTEGER,
        reps INTEGER,
        user_id INTEGER, 
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS nutrition (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        meals TEXT NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL UNIQUE,
        content TEXT DEFAULT '',
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

console.log("Database initialized successfully.");

// Insert default nutrition plans if they don't exist
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

// ✅ Export `db` directly, not inside an object
export default db;


