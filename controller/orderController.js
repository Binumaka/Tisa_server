const mongoose = require("mongoose");
const Order = require("../model/checkoutModel");
const Ornament = require("../model/ornamentsModel");

// Create new order from cart
const createOrder = async (req, res) => {
  try {
    const { userId, items, shipping, payment, customerNotes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    // Get all ornament IDs from the request
    const ornamentIds = items.map((item) => item.ornamentId);

    // Fetch ornaments from DB to get their prices
    const dbOrnaments = await Ornament.find({
      _id: { $in: ornamentIds },
    });

    // Validate all ornaments were found
    if (dbOrnaments.length !== ornamentIds.length) {
      return res.status(400).json({
        message: "One or more ornaments not found in the database.",
      });
    }

    // Compute subtotal
    const subtotal = items.reduce((sum, item) => {
      const matchingOrnament = dbOrnaments.find(
        (o) => o._id.toString() === item.ornamentId
      );
      if (!matchingOrnament) {
        throw new Error(`Ornament not found: ${item.ornamentId}`);
      }
      return sum + matchingOrnament.price * item.quantity;
    }, 0);

    // Compute total
    const total = subtotal + (shipping?.cost || 0);

    const newOrder = new Order({
      userId,
      items: items.map((item) => ({
        ornamentId: item.ornamentId,
        quantity: item.quantity,
      })),
      shipping,
      payment,
      subtotal,
      shippingCost: shipping?.cost || 0,
      total,
      customerNotes,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};

// Get all orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Cast to ObjectId safely
    const objectId = userId.match(/^[0-9a-fA-F]{24}$/) // If it looks like an ObjectId
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    const orders = await Order.find({ userId: objectId })
      .populate("items.ornamentId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Cancel or delete an order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "CANCELLED";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order", error: err.message });
  }
};


// Get all orders (Admin use)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.ornament");
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch all orders", error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  cancelOrder,
};
