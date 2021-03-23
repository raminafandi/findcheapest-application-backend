const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  total_amount: { type: Number, required: true },
  status: { type: String, default: "Processing" },
  _food: [
    {
      restaurantId: {type: mongoose.Schema.ObjectId, ref: "Restaurant"},
      foodType: { type: mongoose.Schema.ObjectId, ref: "Food" },
      count: { type: Number },
      amount: {type: Number}
    },
  ],
  _user: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
