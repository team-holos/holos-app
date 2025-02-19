import express from "express";
import db from "../db/database.js";

const router = express.Router();

// GET: Fetch all nutrition plans
router.get("/", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM nutrition_plans");
    const nutritionPlans = statement.all();
    res.json(nutritionPlans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nutrition data", error: error.message });
  }
});

export default router;
