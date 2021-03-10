const mongoose = require("mongoose"),


const OrderSchema = new mongoose.Schema({
    total_amount: { type: Number, required: true },
    status: { type: String, required: true, default:'Processing'},
    _food: [{ type: Schema.ObjectId, ref: "Food" }],
    _user: { type: Schema.ObjectId, ref: "User" },
    created: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order