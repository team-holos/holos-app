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

// **Get Logged-In User Profile**
router.get("/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;

  try {
    const user = db.prepare("SELECT username FROM users WHERE id = ?").get(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
