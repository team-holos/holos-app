// Load Express Library
const express = require("express");
// Load Cors Library
const cors = require("cors");
// Load bcrypt Library
const bcrypt = require("bcrypt");
// Init dotenv Library
require("dotenv").config();
// Load jsonwebtoken Library
const jwt = require("jsonwebtoken");
// Create an Express Application
const app = express();
// Load the Express Middleware for JSON Parsing
app.use(express.json());
// Enabling CORS
app.use(cors());
// Define Port Number with a Default Value
const PORT = process.env.API_PORT || 3000;

// Import routes
const nutritionRoutes = require("./routes/nutrition"); // ✅ Add this line

// Register routes
app.use("/api/nutrition", nutritionRoutes); // ✅ Now nutrition routes are active

// Define user array
const users = [];

// Create Register Route
app.post("/auth/register", (req, res) => {
  const { email, password, passwordRetype } = req.body;
  if (password !== passwordRetype) {
    return res.status(400).send({ errors: "Passwords do not match" });
  }
  const hashedPassword = bcrypt.hashSync(password, 12);
  users.push({ email, password: hashedPassword });
  res.send({ message: "User successfully registered" });
});

// Create Login Route
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`User: ${email} Password: ${password}`);
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).send({ errors: "User not found" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send({ errors: "Password is incorrect" });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });

  res.send({ message: "User successfully logged in", token });
});

// Get all Users Route with authentication
app.get("/users", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ errors: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ errors: "Failed to authenticate token" });
    }
    res.send(users);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
