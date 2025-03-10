import db from "./database.js";

console.log("🌱 Seeding database...");

// Wrap everything in a transaction
db.exec("BEGIN TRANSACTION;");

// Ensure tables exist before inserting data
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        birthday TEXT,
        weight INTEGER,
        gender TEXT
    );

    CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS training_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        day TEXT NOT NULL,
        workout_type TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`);

console.log("✅ Tables ensured.");

// Insert users
db.exec(`
    INSERT INTO users (username, email, password, birthday, weight, gender)
    VALUES
    ('TestUser1', 'test1@example.com', 'hashedpassword1', '1995-06-15', 80, 'male'),
    ('TestUser2', 'test2@example.com', 'hashedpassword2', '2000-03-22', 65, 'female')
    ON CONFLICT DO NOTHING;
`);

console.log("✅ Users inserted.");

// Insert chat history (assuming user_id 1 exists)
db.exec(`
    INSERT INTO chat_history (user_id, role, content)
    VALUES
    ((SELECT id FROM users WHERE username = 'TestUser1'), 'user', 'Hello, AI!'),
    ((SELECT id FROM users WHERE username = 'TestUser1'), 'assistant', 'Hello, TestUser1! How can I help?')
    ON CONFLICT DO NOTHING;
`);

console.log("✅ Chat history inserted.");

// Insert training plans
db.exec(`
    INSERT INTO training_plans (user_id, day, workout_type)
    VALUES
    ((SELECT id FROM users WHERE username = 'TestUser1'), 'Monday', 'Push'),
    ((SELECT id FROM users WHERE username = 'TestUser1'), 'Wednesday', 'Pull'),
    ((SELECT id FROM users WHERE username = 'TestUser1'), 'Friday', 'Legs')
    ON CONFLICT DO NOTHING;
`);

console.log("✅ Training plans inserted.");

// Commit transaction
db.exec("COMMIT;");

console.log("✅ Database seeded successfully.");
