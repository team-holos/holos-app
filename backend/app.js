import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

app.get("/", (req, res) => {
  res.send("Holos Backend läuft!");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});