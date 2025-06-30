const mongoose = require("mongoose");

const rentOrnamentSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const RentOrnament = mongoose.model("RentOrnament", rentOrnamentSchema);
module.exports = RentOrnament;