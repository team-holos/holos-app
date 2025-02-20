import express from "express";
import db from "../db/database.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  const { date, content } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is missing." });
  }

  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  const formattedDate = localDate.toISOString().split("T")[0];

  try {
    const existingEntry = db
      .prepare("SELECT * FROM journal_entries WHERE user_id = ? AND date = ?")
      .get(userId, formattedDate);

    if (existingEntry) {
      db.prepare(
        "UPDATE journal_entries SET content = ? WHERE user_id = ? AND date = ?"
      ).run(content, userId, formattedDate);
    } else {
      db.prepare(
        "INSERT INTO journal_entries (user_id, date, content) VALUES (?, ?, ?)"
      ).run(userId, formattedDate, content);
    }

    res.json({ message: "Journal entry saved successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:date", authMiddleware, (req, res) => {
  const { date } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is missing." });
  }

  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  const formattedDate = localDate.toISOString().split("T")[0];

  try {
    const entry = db
      .prepare("SELECT * FROM journal_entries WHERE user_id = ? AND date = ?")
      .get(userId, formattedDate);

    if (!entry) {
      return res.status(404).json({ error: "Journal entry not found." });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/entries/all", authMiddleware, (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is missing." });
  }

  try {
    const dates = db
      .prepare("SELECT date FROM journal_entries WHERE user_id = ?")
      .all(userId)
      .map((entry) => entry.date);

    res.json(dates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
