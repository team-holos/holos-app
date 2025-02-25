import express from "express";
import db from "../db/database.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Save or Update Journal Entry
router.post("/", authMiddleware, (req, res) => {
  const { date, content } = req.body;
  const userId = req.user?.id;

  console.log("🔹 [POST] Journal Entry Request Received:");
  console.log("User ID:", userId);
  console.log("Date:", date);
  console.log("Content:", content);

  if (!userId) {
    console.error("❌ User ID missing in request.");
    return res.status(400).json({ error: "User ID is missing." });
  }

  if (!date || !content) {
    console.error("❌ Missing date or content in request.");
    return res.status(400).json({ error: "Date and content are required." });
  }

  try {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    console.log("Formatted Date:", formattedDate);

    const existingEntry = db
      .prepare("SELECT * FROM journal_entries WHERE user_id = ? AND date = ?")
      .get(userId, formattedDate);

    if (existingEntry) {
      console.log("🟢 Updating existing journal entry...");
      db.prepare(
        "UPDATE journal_entries SET content = ? WHERE user_id = ? AND date = ?"
      ).run(content, userId, formattedDate);
    } else {
      console.log("🟢 Inserting new journal entry...");
      db.prepare(
        "INSERT INTO journal_entries (user_id, date, content) VALUES (?, ?, ?)"
      ).run(userId, formattedDate, content);
    }

    console.log("✅ Journal entry saved successfully.");
    res.json({ message: "Journal entry saved successfully." });
  } catch (error) {
    console.error("❌ Error saving journal entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 📖 Get Journal Entry for a Specific Date
router.get("/:date", authMiddleware, (req, res) => {
  const { date } = req.params;
  const userId = req.user?.id;

  console.log("🔹 [GET] Fetching Journal Entry:");
  console.log("User ID:", userId);
  console.log("Requested Date:", date);

  if (!userId) {
    console.error("❌ User ID missing in request.");
    return res.status(400).json({ error: "User ID is missing." });
  }

  try {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    console.log("Formatted Date:", formattedDate);

    const entry = db
      .prepare("SELECT * FROM journal_entries WHERE user_id = ? AND date = ?")
      .get(userId, formattedDate);

    if (!entry) {
      console.warn("⚠️ No journal entry found for this date.");
      return res.status(404).json({ error: "Journal entry not found." });
    }

    console.log("✅ Journal entry found:", entry);
    res.json(entry);
  } catch (error) {
    console.error("❌ Error fetching journal entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 📅 Get All Journal Entry Dates for User
router.get("/entries/all", authMiddleware, (req, res) => {
  const userId = req.user?.id;

  console.log("🔹 [GET] Fetching All Journal Entries:");
  console.log("User ID:", userId);

  if (!userId) {
    console.error("❌ User ID missing in request.");
    return res.status(400).json({ error: "User ID is missing." });
  }

  try {
    const dates = db
      .prepare("SELECT date FROM journal_entries WHERE user_id = ?")
      .all(userId)
      .map((entry) => entry.date);

    console.log("✅ Retrieved journal entry dates:", dates);
    res.json(dates);
  } catch (error) {
    console.error("❌ Error fetching journal dates:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;

