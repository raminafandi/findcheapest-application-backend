const express = require("express");
const router = express.Router();
const Food = require("../../models/Food");

router.post("/", async (req, res) => {
  const {
    name,
    description,
    price,
    portion,
    img,
    url,
    _restaurant,
  } = req.body;
  try {
    let food = new Food({
      name,
      description,
      price,
      portion,
      img,
      url,
      _restaurant,
    });

    await food.save()
    res.json({ food })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send("Server error(product)");
  }
});

router.get("/", async (req, res) => {
  let search = req.query.search
  let price = req.query.price

  let query = {}

  if(search)
  {
    query['$or'] = [
      { "name": { $regex: `.*${search}*.`, $options: "i" } },
      { "description": { $regex: `.*${search}*.`, $options: "i" } }
    ]
  }

  if (price) {
    query['$and'] = [{price: {$lte:`${price}`}}]
  }


  try {
    let foods = await Food.find(query)
    res.status(200).json({ "query": { foods } })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send("Server error(search)");
  }

})


router.get("/:id", async (req, res) => {
  let id = req.params.id
  try {
    let food = await Food.findById(id)
    res.status(200).json({ food })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send("Server error(product)");
  }

})





module.exports = router;

