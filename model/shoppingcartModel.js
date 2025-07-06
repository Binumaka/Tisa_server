const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //Reference of usermodel
    require: true,
  },
  ornament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ornament", // reference of ornament model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const ShoppingCart = mongoose.model("Cart", shoppingCartSchema);

module.exports = ShoppingCart;
