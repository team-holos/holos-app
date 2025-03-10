import express from "express";
import db from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 🔹 **Register User**
router.post("/register", (req, res) => {
  try {
    const { username, email, password, passwordRetype } = req.body;
    console.log("🔍 Received registration request:", { username, email });

    if (!email || !password || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== passwordRetype) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const checkUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (checkUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const insertUser = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    const { lastInsertRowid } = insertUser.run(username, email, hashedPassword);

    console.log("✅ User registered successfully:", { userId: lastInsertRowid, email });

    res.json({
      userId: lastInsertRowid,
      email,
      username,
      message: `User ${username} successfully registered!`,
    });
  } catch (error) {
    console.error("🔥 Registration Error:", error);
    res.status(500).json({ error: "Fehler bei der Registrierung", details: error.message });
  }
});

// 🔹 **Login User**
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Received login request:", { email });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) {
      return res.status(401).json({ error: "E-Mail oder Passwort ist falsch" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "E-Mail oder Passwort ist falsch" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login Successful, Token Generated:", token);

    res.status(200).json({
      token,
      message: "Login erfolgreich",
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ error: "Fehler beim Einloggen", details: error.message });
  }
});

// 🔹 **Change Password**
router.post("/changePassword", (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden" });
    }

    const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Altes Passwort ist falsch" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 12);
    const updateStatement = db.prepare("UPDATE users SET password = ? WHERE id = ?");
    updateStatement.run(hashedPassword, userId);

    console.log("✅ Password changed successfully for user ID:", userId);

    res.status(200).json({ message: "Passwort erfolgreich geändert" });
  } catch (error) {
    console.error("🔥 Password Change Error:", error);
    res.status(500).json({ error: "Fehler beim Ändern des Passworts", details: error.message });
  }
});

export default router;
