require('dotenv').config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if token exists
  if (!authHeader) {
    return res.status(403).json({ message: "Token manquant." });
  }

  try {
    // Format: "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    // attach user to request
    req.utilisateur = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide." });
  }
};