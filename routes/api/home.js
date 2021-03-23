const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

/* 
Get Method : /api/
Home Screen
Returns : home
no need to be authenticated
*/
router.get("/", async (req, res) => {
  try {
    res.send("home");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
