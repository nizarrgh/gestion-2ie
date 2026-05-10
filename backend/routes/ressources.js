const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");

// =====================
// PAYS
// id, libelle, nationalite, code, iso
// =====================
router.get("/pays", verifyToken, (req, res) => {
  db.query("SELECT * FROM pays ORDER BY libelle", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json(results);
  });
});

router.post("/pays", verifyToken, (req, res) => {
  const { libelle, nationalite, code, iso } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO pays (libelle, nationalite, code, iso) VALUES (?, ?, ?, ?)",
    [libelle, nationalite || null, code || null, iso || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, nationalite, code, iso });
    }
  );
});

router.put("/pays/:id", verifyToken, (req, res) => {
  const { libelle, nationalite, code, iso } = req.body;
  db.query(
    "UPDATE pays SET libelle=?, nationalite=?, code=?, iso=? WHERE id=?",
    [libelle, nationalite, code, iso, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, nationalite, code, iso });
    }
  );
});

router.delete("/pays/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM pays WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// ECOLES
// id, libelle, adresse, telephone, email
// =====================
router.get("/ecoles", verifyToken, (req, res) => {
  db.query("SELECT * FROM ecoles ORDER BY libelle", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json(results);
  });
});

router.post("/ecoles", verifyToken, (req, res) => {
  const { libelle, adresse, telephone, email } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO ecoles (libelle, adresse, telephone, email) VALUES (?, ?, ?, ?)",
    [libelle, adresse || null, telephone || null, email || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, adresse, telephone, email });
    }
  );
});

router.put("/ecoles/:id", verifyToken, (req, res) => {
  const { libelle, adresse, telephone, email } = req.body;
  db.query(
    "UPDATE ecoles SET libelle=?, adresse=?, telephone=?, email=? WHERE id=?",
    [libelle, adresse, telephone, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, adresse, telephone, email });
    }
  );
});

router.delete("/ecoles/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM ecoles WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// CYCLES
// id, libelle, duree_annees
// =====================
router.get("/cycles", verifyToken, (req, res) => {
  db.query("SELECT * FROM cycles ORDER BY libelle", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json(results);
  });
});

router.post("/cycles", verifyToken, (req, res) => {
  const { libelle, duree_annees } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO cycles (libelle, duree_annees) VALUES (?, ?)",
    [libelle, duree_annees || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, duree_annees });
    }
  );
});

router.put("/cycles/:id", verifyToken, (req, res) => {
  const { libelle, duree_annees } = req.body;
  db.query(
    "UPDATE cycles SET libelle=?, duree_annees=? WHERE id=?",
    [libelle, duree_annees, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, duree_annees });
    }
  );
});

router.delete("/cycles/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM cycles WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// FILIERES
// id, code, libelle, description
// =====================
router.get("/filieres", verifyToken, (req, res) => {
  db.query("SELECT * FROM filieres ORDER BY libelle", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json(results);
  });
});

router.post("/filieres", verifyToken, (req, res) => {
  const { code, libelle, description } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO filieres (code, libelle, description) VALUES (?, ?, ?)",
    [code || null, libelle, description || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, code, libelle, description });
    }
  );
});

router.put("/filieres/:id", verifyToken, (req, res) => {
  const { code, libelle, description } = req.body;
  db.query(
    "UPDATE filieres SET code=?, libelle=?, description=? WHERE id=?",
    [code, libelle, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, code, libelle, description });
    }
  );
});

router.delete("/filieres/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM filieres WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// SPECIALITES
// id, libelle, filieres_id, description
// =====================
router.get("/specialites", verifyToken, (req, res) => {
  db.query(
    "SELECT s.*, f.libelle AS filiere_libelle FROM specialites s LEFT JOIN filieres f ON s.filieres_id = f.id ORDER BY s.libelle",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json(results);
    }
  );
});

router.post("/specialites", verifyToken, (req, res) => {
  const { libelle, filieres_id, description } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO specialites (libelle, filieres_id, description) VALUES (?, ?, ?)",
    [libelle, filieres_id || null, description || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, filieres_id, description });
    }
  );
});

router.put("/specialites/:id", verifyToken, (req, res) => {
  const { libelle, filieres_id, description } = req.body;
  db.query(
    "UPDATE specialites SET libelle=?, filieres_id=?, description=? WHERE id=?",
    [libelle, filieres_id, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, filieres_id, description });
    }
  );
});

router.delete("/specialites/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM specialites WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// NIVEAUX
// id, libelle, ordre
// =====================
router.get("/niveaux", verifyToken, (req, res) => {
  db.query("SELECT * FROM niveaux ORDER BY ordre", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json(results);
  });
});

router.post("/niveaux", verifyToken, (req, res) => {
  const { libelle, ordre } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO niveaux (libelle, ordre) VALUES (?, ?)",
    [libelle, ordre || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, ordre });
    }
  );
});

router.put("/niveaux/:id", verifyToken, (req, res) => {
  const { libelle, ordre } = req.body;
  db.query(
    "UPDATE niveaux SET libelle=?, ordre=? WHERE id=?",
    [libelle, ordre, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, ordre });
    }
  );
});

router.delete("/niveaux/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM niveaux WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// PARCOURS
// id, libelle, specialites_id, niveaux_id, cycles_id
// =====================
router.get("/parcours", verifyToken, (req, res) => {
  db.query(
    `SELECT p.*,
       s.libelle AS specialite_libelle,
       c.libelle AS cycle_libelle
     FROM parcours p
     LEFT JOIN specialites s ON p.specialites_id = s.id
     LEFT JOIN cycles c      ON p.cycles_id      = c.id
     ORDER BY p.libelle`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json(results);
    }
  );
});
router.post("/parcours", verifyToken, (req, res) => {
  const { libelle, specialites_id, niveaux_id, cycles_id } = req.body;
  
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  if (!specialites_id) return res.status(400).json({ message: "Spécialité requise" });
  if (!cycles_id) return res.status(400).json({ message: "Cycle requis" });

  db.query(
    "INSERT INTO parcours (libelle, specialites_id, niveaux_id, cycles_id) VALUES (?, ?, ?, ?)",
    [libelle, specialites_id, niveaux_id || null, cycles_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, specialites_id, niveaux_id, cycles_id });
    }
  );
});

router.put("/parcours/:id", verifyToken, (req, res) => {
  const { libelle, specialites_id, cycles_id } = req.body;
  db.query(
    "UPDATE parcours SET libelle=?, specialites_id=?, cycles_id=? WHERE id=?",
    [libelle, specialites_id, cycles_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, specialites_id, cycles_id });
    }
  );
});

router.delete("/parcours/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM parcours WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

// =====================
// ANNEES ACADEMIQUES
// id, libelle, date_debut, date_fin
// =====================
router.get("/annees-academiques", verifyToken, (req, res) => {
  db.query("SELECT * FROM anneeacademiques ORDER BY libelle DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json(results);
  });
});

router.post("/annees-academiques", verifyToken, (req, res) => {
  const { libelle, date_debut, date_fin, est_active } = req.body;
  if (!libelle) return res.status(400).json({ message: "Libellé requis" });
  db.query(
    "INSERT INTO anneeacademiques (libelle, date_debut, date_fin, est_active) VALUES (?, ?, ?, ?)",
    [libelle, date_debut || null, date_fin || null, est_active ? 1 : 0],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, libelle, date_debut, date_fin, est_active });
    }
  );
});

router.put("/annees-academiques/:id", verifyToken, (req, res) => {
  const { libelle, date_debut, date_fin, est_active } = req.body;
  db.query(
    "UPDATE anneeacademiques SET libelle=?, date_debut=?, date_fin=?, est_active=? WHERE id=?",
    [libelle, date_debut, date_fin, est_active ? 1 : 0, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, libelle, date_debut, date_fin, est_active });
    }
  );
});

router.delete("/annees-academiques/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM anneeacademiques WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});
// =====================
// ETUDIANTS
// id, nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone
// =====================
router.get("/etudiants", verifyToken, (req, res) => {
  db.query(
    `SELECT e.*, p.libelle AS pays_libelle
     FROM etudiants e
     LEFT JOIN pays p ON e.pays_id = p.id
     ORDER BY e.nom`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json(results);
    }
  );
});
router.get("/etudiants/:id", verifyToken, (req, res) => {
  db.query("SELECT * FROM etudiants WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Étudiant non trouvé" });
    res.json(results[0]);
  });
});

router.post("/etudiants", verifyToken, (req, res) => {
  const { nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone } = req.body;
  if (!nom || !prenoms) return res.status(400).json({ message: "Nom et prénoms requis" });
  db.query(
    "INSERT INTO etudiants (nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nom, prenoms, pays_id || null, civilites_id || null, dateNaissance || null, email || null, telephone || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.status(201).json({ id: result.insertId, nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone });
    }
  );
});

router.put("/etudiants/:id", verifyToken, (req, res) => {
  const { nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone } = req.body;
  db.query(
    "UPDATE etudiants SET nom=?, prenoms=?, pays_id=?, civilites_id=?, dateNaissance=?, email=?, telephone=? WHERE id=?",
    [nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
      res.json({ id: req.params.id, nom, prenoms, pays_id, civilites_id, dateNaissance, email, telephone });
    }
  );
});

router.delete("/etudiants/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM etudiants WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", detail: err.message });
    res.json({ message: "Supprimé" });
  });
});

module.exports = router;