const express = require("express");
const router = express.Router();
const Food = require("../../models/Food");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { name, description, price, portion, img, url, restaurant } = req.body;

  try {
    let food = new Food({
      name,
      description,
      price,
      portion,
      img,
      url,
      restaurant,
    });

    await food.save();
    res.json({ food });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  try {
    let food = await Food.findById(id);
    res.status(200).json({ food });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let products = await Food.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(products)");
  }
});

module.exports = router;
