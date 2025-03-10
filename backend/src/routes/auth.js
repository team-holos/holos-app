import express from "express";
import db from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Received login request:", { email, password });

    if (!email || !password) {
      console.error("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    console.log("🔍 Found user in DB:", user);

    if (!user) {
      console.error("❌ User not found");
      return res.status(401).json({ message: "E-Mail oder Passwort ist falsch" });
    }

    console.log("🔑 Comparing password:", password, "with stored hash:", user.password);
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("✅ Password Valid:", isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: "E-Mail oder Passwort ist falsch" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("🎉 Login Successful, Token Generated:", token);
    res.status(200).json({
      token,
      message: "Login erfolgreich",
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Fehler beim Einloggen", error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    console.log("login", user, email, password);
    
    if (!user) {
      return res
        .status(401)
        .json({ message: "E-Mail oder Passwort ist falsch" });
    }
    console.log("password:", password, user.password);
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("isValidPassword", isValidPassword);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "E-Mail oder Passwort ist falsch 123" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      message: "Login erfolgreich",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Einloggen", error: error.message });
  }
});

 router.post("/changePassword", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const statement = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = statement.get(userId);

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
    console.log("passwordCompare:", oldPassword, user.password);
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Altes Passwort ist falsch" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updateStatement = db.prepare(
      "UPDATE users SET password = ? WHERE id = ?"
    );
    updateStatement.run(hashedPassword, userId);

    res.status(200).json({ message: "Passwort erfolgreich geändert" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Ändern des Passworts", error: error.message });
  }
});
 
export default router;
