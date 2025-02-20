import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import nutritionRoutes from "./src/routes/nutrition.js";
import journalRoutes from "./src/routes/journal.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/auth", authRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/journal", journalRoutes);

app.get("/", (req, res) => {
  res.send("Holos Backend läuft!");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
