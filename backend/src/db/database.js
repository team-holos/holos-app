import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "holos.db");
console.log("Using database at:", dbPath);

const db = new Database(dbPath);

// Create tables with improvements
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

    CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        session_id TEXT DEFAULT NULL,
        role TEXT NOT NULL, -- 'user' or 'assistant'
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        pref_key TEXT NOT NULL,
        pref_value TEXT NOT NULL,
        notifications_enabled BOOLEAN DEFAULT TRUE,
        theme TEXT DEFAULT 'light',
        language TEXT DEFAULT 'de',
        UNIQUE(user_id, pref_key),
        FOREIGN KEY (user_id) REFERENCES users(id)
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

CREATE TABLE IF NOT EXISTS nutrition_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    calorie_target INTEGER DEFAULT 2500,
    protein_target INTEGER DEFAULT 150,
    carbs_target INTEGER DEFAULT 300,
    fats_target INTEGER DEFAULT 80,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



    CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL UNIQUE,
        content TEXT DEFAULT '',
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    -- Store user-specific training plans
    CREATE TABLE IF NOT EXISTS training_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        day TEXT NOT NULL, -- Monday, Tuesday, etc.
        workout_type TEXT NOT NULL, -- Push, Pull, Legs, etc.
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, day)
    );

    -- Store user workout logs with completed sets, reps, weights
    CREATE TABLE IF NOT EXISTS workout_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL, -- Format: YYYY-MM-DD
        exercise TEXT NOT NULL,
        sets INTEGER DEFAULT 0,
        reps INTEGER DEFAULT 0,
        weight REAL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, date, exercise)
    );

    -- Auto-delete old chat history (keep only last 30 days)
    DELETE FROM chat_history WHERE timestamp < datetime('now', '-30 days');
`);

console.log("Database initialized successfully.");

export default db;
