import express from "express";
import db from "../db/database.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Ensure this is imported correctly

const router = express.Router();

/**
 * Get a journal entry for a specific date.
 */
router.get("/:date", authMiddleware, (req, res) => {
    const { date } = req.params;
    const userId = req.user.id; // Get user ID from authentication middleware

    const entry = db
        .prepare("SELECT * FROM journal_entries WHERE user_id = ? AND date = ?")
        .get(userId, date);

    if (!entry) {
        return res.json({ date, content: "" }); // Return an empty entry if none exists
    }

    res.json(entry);
});

/**
 * Save or update a journal entry.
 */
router.post("/", authMiddleware, (req, res) => { // FIXED: Changed from authenticateToken to authMiddleware
    const { date, content } = req.body;
    const userId = req.user?.id; // Ensure user ID is extracted

    if (!userId) {
        return res.status(400).json({ error: "User ID is missing." });
    }

    try {
        // Check if an entry already exists
        const existingEntry = db
            .prepare("SELECT * FROM journal_entries WHERE user_id = ? AND date = ?")
            .get(userId, date);

        if (existingEntry) {
            // Update existing entry
            db.prepare("UPDATE journal_entries SET content = ? WHERE user_id = ? AND date = ?")
                .run(content, userId, date);
        } else {
            // Insert new entry
            db.prepare("INSERT INTO journal_entries (user_id, date, content) VALUES (?, ?, ?)")
                .run(userId, date, content);
        }

        res.json({ message: "Journal entry saved successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get all journal entry dates for the calendar view.
 */
router.get("/entries/all", authMiddleware, (req, res) => {
    const userId = req.user.id;

    const dates = db
        .prepare("SELECT date FROM journal_entries WHERE user_id = ?")
        .all(userId)
        .map(entry => entry.date); // Extract only the dates

    res.json(dates);
});

export default router;
