import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 🔹 GET /api/nutrition/plan - Fetch user's logged meals
 */
router.get("/plan", authenticateToken, (req, res) => {
  const userId = req.user.id;

  try {
    const stmt = db.prepare("SELECT * FROM nutrition WHERE user_id = ? ORDER BY date DESC");
    const meals = stmt.all(userId);

    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🔹 GET /api/nutrition/total - Fetch user's total daily nutrition intake
 */
router.get("/total", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

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

/**
 * 🔹 PUT /api/nutrition/goals - Update user's nutrition goals
 */
router.put("/goals", authenticateToken, (req, res) => {
  const { calorie_target, protein_target, carbs_target, fats_target } = req.body;
  const userId = req.user.id;

  try {
    // Check if user has existing nutrition goals
    const checkStmt = db.prepare("SELECT COUNT(*) AS count FROM nutrition_goals WHERE user_id = ?");
    const { count } = checkStmt.get(userId);

    if (count > 0) {
      // Update existing goals
      const updateQuery = db.prepare(`
        UPDATE nutrition_goals 
        SET calorie_target = ?, protein_target = ?, carbs_target = ?, fats_target = ?
        WHERE user_id = ?
      `);
      updateQuery.run(calorie_target, protein_target, carbs_target, fats_target, userId);
    } else {
      // Insert default goals if they don't exist
      const insertQuery = db.prepare(`
        INSERT INTO nutrition_goals (user_id, calorie_target, protein_target, carbs_target, fats_target)
        VALUES (?, ?, ?, ?, ?)
      `);
      insertQuery.run(userId, calorie_target, protein_target, carbs_target, fats_target);
    }

    res.json({ message: "Nutrition targets updated successfully!" });
  } catch (error) {
    console.error("Error updating nutrition goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🔹 POST /api/nutrition/plan - Log a new meal
 */
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

/**
 * 🔹 DELETE /api/nutrition/plan/:id - Delete a meal
 */
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
