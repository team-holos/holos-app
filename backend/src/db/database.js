import Database from "better-sqlite3";

const db = new Database("./db/holos.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    )
`).run();

export default db;
