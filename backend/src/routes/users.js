import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// **Get All Users (Protected)**
router.get("/", authenticateToken, (req, res) => {
  try {
    const users = db.prepare("SELECT id, username, email FROM users").all();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
