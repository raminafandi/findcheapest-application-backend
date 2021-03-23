const mongoose = require("mongoose")


const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String },
    food_type:{type: String},
    amount: {type: Number, default:0},
    address: { latitude: { type: String }, longitude: { type: String }},
    created: {
        type: Date,
        default: Date.now
    },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;