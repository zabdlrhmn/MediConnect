const express = require("express");
const router = express.Router();
const db = require("../db"); 

router.post("/login", async (req, res) => {
  const { role, password } = req.body;

  if (role === "patient") {
    return res.json({ success: true, role: "patient" });
  }

  if (role === "doctor") {
    try {
  
      const [rows] = await db.query("SELECT password FROM admins WHERE role='doctor'");
      if (rows.length === 0) {
        return res.status(400).json({ success: false, message: "No doctor passwords configured" });
      }

      const storedPassword = rows[0].password;

      if (password === storedPassword) {
        return res.json({ success: true, role: "doctor" });
      } else {
        return res.status(401).json({ success: false, message: "Wrong password" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

 
});

module.exports = router;
