import express from "express";
import database from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, birthday, weight, selectedGender } =
      req.body;

    const checkStatement = database.db.prepare(
      "SELECT COUNT(*) AS count FROM users WHERE email = ?"
    );
    const result = checkStatement.get(email);
    if (result.count > 0) {
      return res.status(400).json({ message: "E-Mail bereits registriert!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const insertStatement = database.db.prepare(
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
    const statement = database.db.prepare("SELECT * FROM users WHERE email = ?");
    const user = statement.get(email);
    console.log("login");
    
    if (!user) {
      return res
        .status(401)
        .json({ message: "E-Mail oder Passwort ist falsch" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "E-Mail oder Passwort ist falsch" });
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

export default router;
