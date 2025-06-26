const mongoose = require("mongoose");

const packagesSchema = new mongoose.Schema({
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
  ornamentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ornament",
      required: true,
    },
  ],
  totalprice: {
    type: Number,
    required: true,
  },
});

const Packages = mongoose.model("Packages", packagesSchema);
module.exports = Packages;
