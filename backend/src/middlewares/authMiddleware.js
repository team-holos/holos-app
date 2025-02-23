import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header Received:", authHeader);

  if (!authHeader) {
    console.error("No Authorization header provided.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  if (!token) {
    console.error("No token found after 'Bearer'.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the structure of decoded token

    // Ensure `req.user` contains `id`
    req.user = {
      id: decoded.userId, // Make sure this key exists
      email: decoded.email,
    };

    console.log("User ID attached to request:", req.user.id);
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticateToken;

