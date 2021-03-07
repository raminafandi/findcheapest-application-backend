const mongoose = require('mongoose')


const PhoneSchema = new mongoose.Schema({
    brand : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    ram : {
        type: Number,
        required: true
    },
    memory : {
        type: Number,
        required: true
    },
    camera : {
        type: Number,
    },
    url : {
        type: String,
        required: true
    },
    screen : {
        type: String,
        required: true
    },
    os : {
        type: String,
    },
    processor : {
        type: String,
    },
    sim : {
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

const Phone = mongoose.model("Phone",PhoneSchema)
module.exports = Phone

