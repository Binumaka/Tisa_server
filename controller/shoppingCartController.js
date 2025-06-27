const Cart = require('../model/shoppingcartModel');

const addToCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the Cart" });
  }
};

const getCartById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const cart = await Cart.find({ userId }).populate("ornament");

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the Cart" });
  }
};

module.exports = {
  addToCart,
  getCartById,
  removeFromCart,
};