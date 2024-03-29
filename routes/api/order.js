const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Order = require("../../models/Order");
const Restaurant = require("../../models/Restaurant");

/* 
POST Method : /api/order
Creates new order
Returns : new order
should be authenticated
*/
router.post("/", auth, async (req, res) => {
  let { total_amount, _food } = req.body;
  try {
    // 5 percentage discount
    total_amount = total_amount * 0.95;

    let order = new Order({
      total_amount,
      _food,
      _user: req.user.id,
    });

    for (let i = 0; i < order._food.length; i++) {
      let restaurantId = order._food[i].restaurantId;
      let restaurant = await Restaurant.findById(restaurantId);
      order._food[i].restaurantName = restaurant.name;
      restaurant.amount += order._food[i].amount;
      await restaurant.save();
    }
    console.log("order", order);

    await order.save();
    res.json({ order, message: "You succesfully get 5% discount!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error(product)");
  }
});

/* 
GET Method : /api/order/:id
Gets order by id
Returns : found order as object
should be authenticated
*/
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

/* 
GET Method : /api/order/me/orders
Gets orders of the user 
Returns : all orders of the user
should be authenticated
*/
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
