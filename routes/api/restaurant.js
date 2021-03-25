const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");
const auth = require("../../middleware/auth");

/* 
POST Method : /api/restaurants
Creates new restaurant
Returns : new restaurant data
no neet to be authenticated
*/
router.post("/", async (req, res) => {
  const { name, logo, description, location, address, food_type } = req.body;
  try {
    let restaurant = new Restaurant({
      name,
      logo,
      description,
      food_type,
      location,
      address
    });
    await restaurant.save();
    res.json({ restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(restaurant)");
  }
});

/* 
GET Method : /api/restaurants
Creates new restaurant
Returns : new restaurant data
no need to be authenticated
*/
router.get("/", async (req, res) => {
  try {
    let restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(restaurant)");
  }
});

/* 
GET Method : /api/restaurants/find
Finds restaurant by query
Returns : found restaurant 
no need to be authenticated
*/
router.get("/find", async (req, res) => {
  try {
    let title = req.query.title;
    let food = await Restaurant.findOne({ name: title });
    console.log({food})
    res.send({ id: food._id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(restaurant)");
  }
});

/* 
GET Method : /api/restaurants/:id
Gets restaurant by id
Returns : new restaurant data
no need to be authenticated
*/
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
