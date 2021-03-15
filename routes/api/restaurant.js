const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { name, logo, description, address } = req.body;

  try {
    let restaurant = new Restaurant({ name, logo, description, address });
    await restaurant.save();
    res.json({ restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(restaurant)");
  }
});

router.get("/", async (req, res) => {
  try {
    let restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(restaurant)");
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let restaurant = await Restaurant.findById(id);
    res.json({ restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(restaurant)");
  }
});

module.exports = router;
