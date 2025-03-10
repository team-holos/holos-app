import db from "./database.js";

console.log("Seeding database...");

db.exec(`
    INSERT INTO users (username, email, password, birthday, weight, gender)
    VALUES
    ('TestUser1', 'test1@example.com', 'hashedpassword1', '1995-06-15', 80, 'male'),
    ('TestUser2', 'test2@example.com', 'hashedpassword2', '2000-03-22', 65, 'female')
    ON CONFLICT DO NOTHING;

    INSERT INTO chat_history (user_id, role, content)
    VALUES
    (1, 'user', 'Hello, AI!'),
    (1, 'assistant', 'Hello, TestUser1! How can I help?')
    ON CONFLICT DO NOTHING;

    INSERT INTO training_plans (user_id, day, workout_type)
    VALUES
    (1, 'Monday', 'Push'),
    (1, 'Wednesday', 'Pull'),
    (1, 'Friday', 'Legs')
    ON CONFLICT DO NOTHING;
`);

console.log("Database seeded successfully.");
