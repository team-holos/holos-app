import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/total", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    const query = db.prepare(`
      SELECT 
        COALESCE(SUM(calories), 0) AS calories, 
        COALESCE(SUM(protein), 0) AS protein, 
        COALESCE(SUM(carbs), 0) AS carbs, 
        COALESCE(SUM(fats), 0) AS fats
      FROM nutrition 
      WHERE user_id = ? AND date = ?
    `);
    const result = query.get(userId, today);

    res.json(result);
  } catch (error) {
    console.error("Error fetching total nutrition:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/goals", authenticateToken, (req, res) => {
  const { calorie_target, protein_target, carbs_target, fats_target } = req.body;
  const userId = req.user.id;

  try {
    const updateQuery = db.prepare(`
      UPDATE nutrition_goals 
      SET calorie_target = ?, protein_target = ?, carbs_target = ?, fats_target = ?
      WHERE user_id = ?
    `);
    updateQuery.run(calorie_target, protein_target, carbs_target, fats_target, userId);

    res.json({ message: "Nutrition targets updated successfully!" });
  } catch (error) {
    console.error("Error updating nutrition goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/plan", authenticateToken, (req, res) => {
  const { name, calories, protein, carbs, fats } = req.body;
  const userId = req.user.id;

  if (!name || !calories || !protein || !carbs || !fats) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO nutrition (user_id, name, calories, protein, carbs, fats, date)
      VALUES (?, ?, ?, ?, ?, ?, DATE('now'))
    `);
    stmt.run(userId, name.trim(), parseInt(calories), parseInt(protein), parseInt(carbs), parseInt(fats));

    res.json({ message: "Meal added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


router.delete("/plan/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const stmt = db.prepare("DELETE FROM nutrition WHERE id = ? AND user_id = ?");
    stmt.run(id, userId);
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
