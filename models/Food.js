const mongoose = require('mongoose')


const FoodSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
    },
    price : {
        type: Number,
        required: true
    },
    portion : {
        type: Number,
        default: 1
    },
    img : {
        type: String,
    },
    url : {
        type: String,
        required: true
    },
    restaurant: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

const Food = mongoose.model("Food",FoodSchema)
module.exports = Food

