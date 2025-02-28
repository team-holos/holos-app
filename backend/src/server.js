import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "./db/database.js";
import authenticateToken from "./middlewares/authMiddleware.js";

// Load environment variables
dotenv.config();

// Create Express App
const app = express();
app.use(express.json());
app.use(cors());

// Define Port
const PORT = process.env.API_PORT || 3000;

// Import Routes
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import nutritionRoutes from "./routes/nutrition.js";
import chatRoutes from "./routes/chat.js";
import preferencesRoutes from "./routes/preferences.js";
import journalRoutes from "./routes/journal.js";
import trainingRoutes from "./routes/training.js";

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateToken, usersRoutes);
app.use("/api/chat", authenticateToken, chatRoutes);
app.use("/api/preferences", authenticateToken, preferencesRoutes);
app.use("/api/nutrition", authenticateToken, nutritionRoutes);
app.use("/api/journal", authenticateToken, journalRoutes);
app.use("/api/training", authenticateToken, trainingRoutes);

// 🔹 **Save Training Plan**
app.post("/api/training-plan", authenticateToken, (req, res) => {
  const { user_id, trainingPlan } = req.body;

  if (!user_id || !trainingPlan) {
    return res.status(400).json({ error: "Missing user_id or trainingPlan" });
  }

  const stmt = db.prepare(`
      INSERT INTO training_plans (user_id, day, workout_type) 
      VALUES (?, ?, ?) 
      ON CONFLICT(user_id, day) DO UPDATE SET workout_type=excluded.workout_type
  `);

  try {
    db.transaction(() => {
      Object.entries(trainingPlan).forEach(([day, workout]) => {
        stmt.run(user_id, day, workout);
      });
    })();

    res.json({ message: "Training plan saved successfully." });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 **Fetch Training Plan**
app.get("/api/training-plan/:user_id", authenticateToken, (req, res) => {
  const { user_id } = req.params;

  try {
    const results = db.prepare("SELECT day, workout_type FROM training_plans WHERE user_id = ?").all(user_id);
    
    const trainingPlan = results.reduce((plan, row) => {
      plan[row.day] = row.workout_type;
      return plan;
    }, {});

    res.json(trainingPlan);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 **Log a Workout**
app.post("/api/workout-log", authenticateToken, (req, res) => {
  const { user_id, date, exercise, sets, reps, weight } = req.body;

  if (!user_id || !date || !exercise) {
    return res.status(400).json({ error: "Missing required workout details" });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO workout_logs (user_id, date, exercise, sets, reps, weight) 
      VALUES (?, ?, ?, ?, ?, ?) 
      ON CONFLICT(user_id, date, exercise) 
      DO UPDATE SET sets=excluded.sets, reps=excluded.reps, weight=excluded.weight
    `);
    
    stmt.run(user_id, date, exercise, sets || 0, reps || 0, weight || 0);

    res.json({ message: "Workout logged successfully." });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 **Fetch Workout Logs**
app.get("/api/workout-log/:user_id", authenticateToken, (req, res) => {
  const { user_id } = req.params;

  try {
    const results = db.prepare("SELECT date, exercise, sets, reps, weight FROM workout_logs WHERE user_id = ?").all(user_id);
    
    const workoutLogs = results.reduce((logs, row) => {
      if (!logs[row.date]) logs[row.date] = {};
      logs[row.date][row.exercise] = { sets: row.sets, reps: row.reps, weight: row.weight };
      return logs;
    }, {});

    res.json(workoutLogs);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

/* // 🔹 **Register User**
app.post("/auth/register", (req, res) => {
  const { username, email, password, passwordRetype } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (password !== passwordRetype) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const checkUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (checkUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const insertUser = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
  const { lastInsertRowid } = insertUser.run(username, email, hashedPassword);

  res.json({ userId: lastInsertRowid, email, username, message: `User ${username} successfully registered!` });
});

// 🔹 **Login User**
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: "Incorrect password" });
  }
  
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
  res.json({ message: "Login successful", token });
});

app.post("/auth/changePassword", async (req, res) => {
  
  try {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    const statement = database.db.prepare("SELECT * FROM users WHERE id = ?");
    console.log("user", userId);
    const user = statement.get(userId);
     
     if (!user) {
       return res.status(404).json({ message: "Benutzer nicht gefunden" });
      }
      
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Altes Passwort ist falsch" });
      }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updateStatement = database.db.prepare(
      "UPDATE users SET password = ? WHERE id = ?"
    );
    updateStatement.run(hashedPassword, userId);

    res.status(200).json({ message: "Passwort erfolgreich geändert" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Ändern des Passworts", error: error.message });
  }
}); */

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
