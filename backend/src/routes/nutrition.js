import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

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

  console.log("Received meal data:", {
    userId,
    name,
    calories,
    protein,
    carbs,
    fats,
  });

  if (!name || !calories || !protein || !carbs || !fats) {
    console.error("Missing fields:", { name, calories, protein, carbs, fats });
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
      parseInt(calories, 10),
      parseInt(protein, 10),
      parseInt(carbs, 10),
      parseInt(fats, 10)
    );

    console.log("Meal added successfully");
    res.json({ message: "Meal added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.put("/plan/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, calories, protein, carbs, fats } = req.body;
  const userId = req.user.id;

  try {
    const stmt = db.prepare(`
      UPDATE nutrition 
      SET name = ?, calories = ?, protein = ?, carbs = ?, fats = ?
      WHERE id = ? AND user_id = ?
    `);
    stmt.run(name, calories, protein, carbs, fats, id, userId);

    res.json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
