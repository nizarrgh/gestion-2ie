const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const db = require("../config/db"); // your MySQL connection
const verifyToken = require("../middleware/verifyToken");


const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// =======================
// REGISTER (optional)
// =======================
router.post("/register", async (req, res) => {
  const { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO utilisateurs (nom, email, password) VALUES (?, ?, ?)",
      [nom, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Erreur serveur." });
        }

        res.status(201).json({ message: "Utilisateur créé avec succès." });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// =======================
// LOGIN
// =======================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM utilisateurs WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erreur serveur." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Utilisateur introuvable." });
      }

      const utilisateur = results[0];

      const isMatch = await bcrypt.compare(password, utilisateur.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
      }

      // 🎟️ Generate token
      const token = jwt.sign(
        { id: utilisateur.id },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Connexion réussie",
        token,
        utilisateur: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
        },
      });
    }
  );
});

// =======================
// GET CURRENT USER
// =======================
router.get("/me", verifyToken, (req, res) => {
  db.query(
    "SELECT id, nom, email FROM utilisateurs WHERE id = ?",
    [req.utilisateur.id],
    (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(404)
          .json({ message: "Utilisateur introuvable." });
      }

      res.json(results[0]);
    }
  );
});

module.exports = router;