import express from "express";
import db from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, birthday, weight, selectedGender } =
      req.body;

    const checkStatement = db.prepare(
      "SELECT COUNT(*) AS count FROM users WHERE email = ?"
    );
    const result = checkStatement.get(email);
    if (result.count > 0) {
      return res.status(400).json({ message: "E-Mail bereits registriert!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const insertStatement = db.prepare(
      "INSERT INTO users (email, username, password, birthday, weight, gender) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const info = insertStatement.run(
      email,
      username,
      hashedPassword,
      birthday,
      weight,
      selectedGender
    );

    res.status(201).json({
      userId: info.lastInsertRowid,
      email,
      username,
      message: `Benutzer ${username} erfolgreich registriert!`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Registrieren", error: error.message });
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
