const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      require: true,
    },
    ornamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ornament", // reference of ornament model
      required: true,
    },
  },
  { timestamps: true }
);

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
