const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
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
  RentOrnamentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentOrnament",
    },
  ],
  totalprice: {
    type: Number,
    required: true,
  },
});

const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;
