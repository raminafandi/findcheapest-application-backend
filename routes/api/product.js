const express = require("express");
const router = express.Router();
const Food = require("../../models/Food");
const auth = require("../../middleware/auth");
const paginatedResults = require("../../middleware/paginatedResults");
const paginatedFilterResults = require("../../middleware/paginatedFilterResults");
// const paginate = require("../../helpers/paginate")

/* 
POST Method : /api/products
Create a product 
Returns : created product
no need to be authenticated
*/
router.post("/", async (req, res) => {
  const { name, description, price, portion, img, _restaurant } = req.body;
  try {
    let food = new Food({
      name,
      description,
      price,
      portion,
      img,
      _restaurant,
    });

    await food.save();
    res.json({ food });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

/* 
GET Method : /api/products/product/:id
Gets the product by id
Returns : found product as object
no need to be authenticated
*/
router.get("/product/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let food = await Food.findById(id);
    res.status(200).json({ food });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

/* 
GET Method : /api/products/filter
Gets the filtered and paginated result=>products
Returns : the filtered paginated results 
no need to be authenticated
*/
router.get("/filter", paginatedFilterResults(Food), async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(search)");
  }
});

/* 
GET Method : /api/products/all
Gets all products without filter but paginated
Returns : paginated products 
should be authenticated
*/
router.get("/all", auth, paginatedResults(Food), async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(product1)");
  }
});

module.exports = router;
