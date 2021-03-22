const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");


router.get("/", async (req, res) => {
  try {
    res.json({ "req.ip": req.ip,"request.connection.remoteAddress":req.connection.remoteAddress });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
