const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    res.json({ neymar: "home" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
