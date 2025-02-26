import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/goals", authenticateToken, (req, res) => {
  const userId = req.user.id;

  try {
    const query = db.prepare("SELECT * FROM nutrition_goals WHERE user_id = ?");
    const result = query.get(userId);

    if (!result) {
      const insertQuery = db.prepare(
        `INSERT INTO nutrition_goals (user_id) VALUES (?)`
      );
      insertQuery.run(userId);

      return res.json({
        calorie_target: 2500,
        protein_target: 150,
        carbs_target: 300,
        fats_target: 80,
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching nutrition goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/goals", authenticateToken, (req, res) => {
  const { calorie_target, protein_target, carbs_target, fats_target } =
    req.body;
  const userId = req.user.id;

  try {
    const updateQuery = db.prepare(`
      UPDATE nutrition_goals 
      SET calorie_target = ?, protein_target = ?, carbs_target = ?, fats_target = ?
      WHERE user_id = ?
    `);
    updateQuery.run(
      calorie_target,
      protein_target,
      carbs_target,
      fats_target,
      userId
    );

    res.json({ message: "Nutrition targets updated successfully!" });
  } catch (error) {
    console.error("Error updating nutrition goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/plan", authenticateToken, (req, res) => {
  const userId = req.user.id;
  try {
    const meals = db
      .prepare("SELECT * FROM nutrition WHERE user_id = ?")
      .all(userId);
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
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
      INSERT INTO nutrition (user_id, name, calories, protein, carbs, fats)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      userId,
      name.trim(),
      parseInt(calories),
      parseInt(protein),
      parseInt(carbs),
      parseInt(fats)
    );

    res.json({ message: "Meal added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.delete("/plan/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const stmt = db.prepare(
      "DELETE FROM nutrition WHERE id = ? AND user_id = ?"
    );
    stmt.run(id, userId);
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
