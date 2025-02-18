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

export default db;
