import express from "express";
import db from "../db/database.js"; // ✅ Now correctly imports `db`

const router = express.Router();

router.get("/plan", (req, res) => {
    try {
        console.log("Fetching nutrition plans...");
        const nutritionPlans = db.prepare("SELECT * FROM nutrition").all();
        console.log("Plans found:", nutritionPlans);
        res.json(nutritionPlans);
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;



