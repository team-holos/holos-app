import express from "express";
import db from "../db/database.js";

const router = express.Router();

// 🔹 Save user preferences
router.post("/save", (req, res) => {
    const { user_id, key, value } = req.body;

    if (!user_id || !key || !value) {
        return res.status(400).json({ error: "Preference key and value required." });
    }

    try {
        console.log(`Saving preference: user_id=${user_id}, key=${key}, value=${value}`);

        const stmt = db.prepare(`
            INSERT INTO user_preferences (user_id, pref_key, pref_value)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, pref_key) DO UPDATE SET pref_value = excluded.pref_value
        `);

        stmt.run(user_id, key, value);

        res.json({ message: "Preference saved successfully." });
    } catch (error) {
        console.error("Error saving preference:", error);
        res.status(500).json({ error: `Failed to save preference: ${error.message}` });
    }
});

// 🔹 Get user preferences
router.get("/get/:user_id", (req, res) => {
    const { user_id } = req.params;
    try {
        const rows = db.prepare("SELECT pref_key, pref_value FROM user_preferences WHERE user_id = ?").all(user_id);
        const preferences = Object.fromEntries(rows.map((row) => [row.pref_key, row.pref_value])); // Convert to object

        res.json(preferences);
    } catch (error) {
        console.error("Error fetching preferences:", error);
        res.status(500).json({ error: "Failed to load preferences." });
    }
});

export default router;


