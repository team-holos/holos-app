import express from "express";
import db from "../db/database.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

/** 
 * 🔹 Save or Update Training Plan
 * Updates the user's weekly workout schedule.
 */
router.post("/training-plan", authenticateToken, (req, res) => {
  const { user_id, trainingPlan } = req.body;

  if (!user_id || !trainingPlan) {
    return res.status(400).json({ error: "Missing user_id or trainingPlan" });
  }

  try {
    const insertOrUpdateStmt = db.prepare(`
      INSERT INTO training_plans (user_id, day, workout_type) 
      VALUES (?, ?, ?) 
      ON CONFLICT(user_id, day) 
      DO UPDATE SET workout_type = excluded.workout_type
    `);

    db.transaction(() => {
      Object.entries(trainingPlan).forEach(([day, workout_type]) => {
        insertOrUpdateStmt.run(user_id, day, workout_type);
      });
    })();

    res.json({ message: "Training plan updated successfully." });
  } catch (error) {
    console.error("Error updating training plan:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

/** 
 * 🔹 Fetch Training Plan 
 * Retrieves the user's saved workout schedule.
 */
router.get("/training-plan/:user_id", authenticateToken, (req, res) => {
  const { user_id } = req.params;

  try {
    const results = db
      .prepare("SELECT day, workout_type FROM training_plans WHERE user_id = ?")
      .all(user_id);

    console.log("🔍 Raw DB Results:", results); // Log raw data from SQLite

    const trainingPlan = results.reduce((plan, row) => {
      plan[row.day] = row.workout_type;
      return plan;
    }, {});

    console.log("📌 Formatted Training Plan:", trainingPlan); // Log final structure

    res.json(trainingPlan);
  } catch (error) {
    console.error("🚨 Error fetching training plan:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});



/** 
 * 🔹 Log a Workout 
 * Saves completed sets, reps, and weight for an exercise.
 */
router.post("/workout-log", authenticateToken, (req, res) => {
  const { user_id, date, exercise, sets, reps, weight } = req.body;

  if (!user_id || !date || !exercise) {
    return res.status(400).json({ error: "Missing required workout details" });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO workout_logs (user_id, date, exercise, sets, reps, weight) 
      VALUES (?, ?, ?, ?, ?, ?) 
      ON CONFLICT(user_id, date, exercise) 
      DO UPDATE SET sets = excluded.sets, reps = excluded.reps, weight = excluded.weight
    `);
    
    stmt.run(user_id, date, exercise, sets || 0, reps || 0, weight || 0);

    res.json({ message: "Workout logged successfully." });
  } catch (error) {
    console.error("Error logging workout:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

/** 
 * 🔹 Fetch Workout Logs 
 * Retrieves all logged workouts by the user.
 */
router.get("/workout-log/:user_id", authenticateToken, (req, res) => {
  const { user_id } = req.params;

  try {
    const results = db
      .prepare("SELECT date, exercise, sets, reps, weight FROM workout_logs WHERE user_id = ?")
      .all(user_id);
    
    const workoutLogs = results.reduce((logs, row) => {
      if (!logs[row.date]) logs[row.date] = {};
      logs[row.date][row.exercise] = { sets: row.sets, reps: row.reps, weight: row.weight };
      return logs;
    }, {});

    res.json(workoutLogs);
  } catch (error) {
    console.error("Error fetching workout logs:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

export default router;
