const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Order = require("../../models/Order");
const Restaurant = require("../../models/Restaurant");

router.post("/", auth, async (req, res) => {
  let { total_amount, _food, _restaurant } = req.body;
  try {
    
    // 5 percentage discount
    total_amount = total_amount * 0.95

    let order = new Order({
      total_amount,
      _food,
      _restaurant,
      _user: req.user.id,
    });

    await order.save();


    order._food.forEach(async(food)=>{
      let restaurantId = food.restaurantId
      let restaurant = await Restaurant.findById(restaurantId)
      restaurant.amount += food.amount
      await restaurant.save()
    })
    
    res.json({ order,message:"You succesfully get 5% discount!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  try {
    let order = await Order.findById(id);
    console.log(order._user.toString() === req.user.id);
    order._user.toString() === req.user.id
      ? res.status(200).json({ order })
      : res.status(401).json({
          errors: ["You are not authorized to see this information."],
        });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

router.get("/me/orders", auth, async (req, res) => {
  try {
    let orders = await Order.find({ _user: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error(product)");
  }
});

module.exports = router;
