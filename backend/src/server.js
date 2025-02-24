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
import usersRoutes from "./routes/users.js";
import nutritionRoutes from "./routes/nutrition.js";
import chatRoutes from "./routes/chat.js";
import preferencesRoutes from "./routes/preferences.js";
import journalRoutes from "./routes/journal.js";

// Register Routes
app.use("/api/users", authenticateToken, usersRoutes);
app.use("/api/chat", authenticateToken, chatRoutes); // 🔹 Now protected
app.use("/api/preferences", authenticateToken, preferencesRoutes);
app.use("/api/nutrition", authenticateToken, nutritionRoutes);
app.use("/api/journal", authenticateToken, journalRoutes);

// Debugging: Show registered routes
console.log("Registered API Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route.path);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(handler.route.path);
      }
    });
  }
});

// 🔹 **Register User**
app.post("/auth/register", (req, res) => {
  const { username, email, password, passwordRetype } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (password !== passwordRetype) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Check if user exists
  const checkUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (checkUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash Password and Insert User
  const hashedPassword = bcrypt.hashSync(password, 12);
  const insertUser = db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  );
  const { lastInsertRowid } = insertUser.run(username, email, hashedPassword);

  res.json({
    userId: lastInsertRowid,
    email,
    username,
    message: `User ${username} successfully registered!`,
  });
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

  // Generate Token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// 🔹 **Save Chat History**
app.post("/api/chat/save", authenticateToken, (req, res) => {
  const { messages } = req.body;
  const userId = req.user.userId;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid chat messages." });
  }

  try {
    const insertStmt = db.prepare(
      "INSERT INTO chat_history (user_id, role, content) VALUES (?, ?, ?)"
    );

    messages.forEach(msg => {
      insertStmt.run(userId, msg.role, msg.content);
    });

    res.json({ message: "Chat history saved successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 **Fetch Chat History**
app.get("/api/chat/history", authenticateToken, (req, res) => {
  const userId = req.user.userId;

  try {
    const history = db
      .prepare("SELECT role, content FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC")
      .all(userId);

    res.json({ history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
});

// 🔹 **Get All Users (Protected)**
app.get("/api/users", authenticateToken, (req, res) => {
  try {
    const users = db.prepare("SELECT id, username, email FROM users").all();
    res.json(users);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


