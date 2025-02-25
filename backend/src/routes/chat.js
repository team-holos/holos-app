import express from "express";
import db from "../db/database.js";

const router = express.Router();

// Test route to check if chat API is working
router.get("/test", (req, res) => {
    res.json({ message: "Chat route is working!" });
});

// Save user message and Holi's response
router.post("/save", (req, res) => {
    const { user_id, messages } = req.body;

    if (!user_id || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Invalid request format." });
    }

    try {
        const insertStmt = db.prepare(
            "INSERT INTO chat_history (user_id, role, content) VALUES (?, ?, ?)"
        );

        const insertTransaction = db.transaction(() => {
            messages.forEach((msg) => {
                insertStmt.run(user_id, msg.role, msg.content);
            });
        });

        insertTransaction(); // Execute transaction 

        res.json({ message: "Chat saved successfully." });
    } catch (error) {
        console.error("Error saving chat:", error);
        res.status(500).json({ error: "Failed to save chat." });
    }
});

// Retrieve chat history for a user
router.get("/history/:user_id", (req, res) => {
    const { user_id } = req.params;

    try {
        const history = db
            .prepare("SELECT role, content, timestamp FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC")
            .all(user_id);

        res.json({ history });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to load chat history." });
    }
});

export default router;



