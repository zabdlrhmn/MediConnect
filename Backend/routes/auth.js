const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
console.log('Auth router module loaded');

// Login using only password for doctor
router.post("/login", async (req, res) => {
  const { role, password } = req.body;

  if (role === "patient") {
    // no password required for patient
    return res.json({ role: "patient", message: "Logged in as patient" });
  }

  if (role === "doctor") {
    try {
      // Fetch stored passwords for doctors (table: admins)
      const [rows] = await db.query("SELECT password FROM admins WHERE role='doctor'");
      if (rows.length === 0) return res.status(400).json({ message: "No doctor passwords configured" });

      // Check each stored password: allow plaintext or bcrypt-hashed passwords
      for (const r of rows) {
        const stored = r.password;
        // direct plaintext match
        if (stored === password) return res.json({ role: "doctor", message: "Logged in as doctor" });
        // bcrypt compare (safe for hashed values)
        try {
          const match = await bcrypt.compare(password, stored);
          if (match) return res.json({ role: "doctor", message: "Logged in as doctor" });
        } catch (e) {
          // ignore compare errors and continue
        }
      }

      return res.status(400).json({ message: "Wrong password" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
