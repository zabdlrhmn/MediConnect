const express = require("express");
const router = express.Router();
const pool = require("../db"); 

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM doctors");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
