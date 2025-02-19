import express from "express";
import db from "../db/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const nutritionPlans = db.prepare("SELECT * FROM nutrition").all();
    res.json(nutritionPlans);
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

