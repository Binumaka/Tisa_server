const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //Reference of usermodel
    require: true,
  },
  items: [
    {
      ornament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ornament",
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const ShoppingCart = mongoose.model("Cart", shoppingCartSchema);

module.exports = ShoppingCart;
