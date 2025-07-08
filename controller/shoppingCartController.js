const Cart = require("../model/shoppingcartModel");

const addToCart = async (req, res) => {
  try {
    const { userId, ornamentId, quantity = 1 } = req.body;

    if (!userId || !ornamentId) {
      return res.status(400).json({ error: "Missing userId or ornamentId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        userId,
        items: [{ ornament: ornamentId, quantity }],
      });
    } else {
      // Check if the item is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.ornament.toString() === ornamentId
      );

      if (itemIndex > -1) {
        // Item exists, update quantity
        cart.items[itemIndex].quantity =
          parseInt(cart.items[itemIndex].quantity) + parseInt(quantity);
      } else {
        // Item does not exist, add new
        cart.items.push({ ornament: ornamentId, quantity });
      }
    }

    const savedCart = await cart.save();
    const populatedCart = await Cart.findById(savedCart._id).populate(
      "items.ornament"
    );
    res.status(201).json(populatedCart);
  } catch (error) {
    console.error("Cart creation failed:", error);
    res.status(500).json({ error: "Failed to create or update the cart" });
  }
};

const getCartById = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.ornament");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, ornamentId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item.ornament.toString() !== ornamentId
    );

    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart", items: cart.items });
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

module.exports = {
  addToCart,
  getCartById,
  removeFromCart,
};
