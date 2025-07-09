const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },

    items: [
        {
          ornament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ornament",
            required: true,
          }
        },
      ],
  },
  { timestamps: true }
);

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
