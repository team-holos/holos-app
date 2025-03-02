import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 🔹 GET /api/nutrition/goals - Fetch user's nutrition goals
 */
router.get("/goals", authenticateToken, (req, res) => {
  const userId = req.user.id;

  try {
    const query = db.prepare(
      "SELECT calorie_target, protein_target, carbs_target, fats_target FROM nutrition_goals WHERE user_id = ?"
    );
    const goals = query.get(userId);

    if (!goals) {
      return res.status(404).json({ error: "No nutrition goals found" });
    }

    res.json(goals);
  } catch (error) {
    console.error("❌ Error fetching nutrition goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🔹 GET /api/nutrition/total - Fetch user's total daily nutrition intake
 */
router.get("/total", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date()); // Ensure YYYY-MM-DD format

  console.log(`🟢 Fetching total nutrition for user ${userId} on ${today}`);

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
    console.log("🔹 Query Result:", result);

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching total nutrition:", error);
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
    const checkStmt = db.prepare(
      "SELECT COUNT(*) AS count FROM nutrition_goals WHERE user_id = ?"
    );
    const { count } = checkStmt.get(userId);

    if (count > 0) {
      const updateQuery = db.prepare(`
        UPDATE nutrition_goals 
        SET calorie_target = ?, protein_target = ?, carbs_target = ?, fats_target = ?
        WHERE user_id = ?
      `);
      updateQuery.run(calorie_target, protein_target, carbs_target, fats_target, userId);
    } else {
      const insertQuery = db.prepare(`
        INSERT INTO nutrition_goals (user_id, calorie_target, protein_target, carbs_target, fats_target)
        VALUES (?, ?, ?, ?, ?)
      `);
      insertQuery.run(userId, calorie_target, protein_target, carbs_target, fats_target);
    }

    res.json({ message: "Nutrition targets updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating nutrition goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🔹 GET /api/nutrition/plan - Fetch user's logged meals
 */
router.get("/plan", authenticateToken, (req, res) => {
  const userId = req.user.id;

  try {
    const query = db.prepare(`
      SELECT id, name, calories, protein, carbs, fats, date
      FROM nutrition
      WHERE user_id = ?
      ORDER BY date DESC
    `);
    const meals = query.all(userId);

    res.json(meals);
  } catch (error) {
    console.error("❌ Error fetching meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🔹 POST /api/nutrition/plan - Log a new meal (Fixes date storage)
 */
router.post("/plan", authenticateToken, (req, res) => {
  const { name, calories, protein, carbs, fats } = req.body;
  const userId = req.user.id;

  if (!name || !calories || !protein || !carbs || !fats) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date()); // Ensure YYYY-MM-DD format

  try {
    const stmt = db.prepare(`
      INSERT INTO nutrition (user_id, name, calories, protein, carbs, fats, date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      userId,
      name.trim(),
      parseInt(calories),
      parseInt(protein),
      parseInt(carbs),
      parseInt(fats),
      today
    );

    console.log(`🟢 Meal added: ${name} for user ${userId} on ${today}`);

    res.json({ message: "Meal added successfully" });
  } catch (error) {
    console.error("❌ Database error:", error);
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
    console.log(`🗑️ Meal ID ${id} deleted for user ${userId}`);
    
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
