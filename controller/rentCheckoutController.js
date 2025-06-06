const mongoose = require("mongoose");
const RentOrder = require("../model/rentCheckoutModel");

const createRentOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      shipping,
      payment,
      subtotal,
      shippingCost,
      total,
      rentStartDate,
      rentEndDate,
      customerNotes,
    } = req.body;

    // Basic validations
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided." });
    }

    if (!rentStartDate || !rentEndDate) {
      return res.status(400).json({ message: "Rent start and end dates are required." });
    }

    const startDate = new Date(rentStartDate);
    const endDate = new Date(rentEndDate);

    if (startDate >= endDate) {
      return res.status(400).json({ message: "End date must be after start date." });
    }

    const newOrder = new RentOrder({
      userId,
      items: items.map((item) => ({
        RentornamentId: item.RentornamentId,
      })),
      shipping: {
        method: shipping?.method || "",
        cost: shippingCost || 0,
        firstName: shipping?.firstName || "",
        lastName: shipping?.lastName || "",
        address: shipping?.address || "",
        city: shipping?.city || "",
        province: shipping?.province || "",
        country: shipping?.country || "Nepal",
        phone: shipping?.phone || "",
        email: shipping?.email || "",
        additionalInfo: shipping?.additionalInfo || "",
      },
      payment: {
        method: payment?.method || "",
        status: payment?.status || "PENDING",
        transactionId: payment?.transactionId || "",
      },
      subtotal,
      shippingCost,
      total,
      rentStartDate: startDate,
      rentEndDate: endDate,
      status: "PENDING",
      customerNotes: customerNotes || "",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Rent order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to place rent order",
      error: err.message,
    });
  }
};

// Get all orders by user
const getRentOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const orders = await RentOrder.find({ userId })
      .populate("items.RentornamentId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

const cancelRentOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await RentOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled." });
    }

    order.status = "CANCELLED";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error cancelling order", error: err.message });
  }
};

const getAllRentOrder = async (req, res) => {
  try {
    const orders = await RentOrder.find({})
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("items.RentornamentId");

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch all orders", error: err.message });
  }
};

module.exports = {
  createRentOrder,
  getRentOrderByUser,
  cancelRentOrder,
  getAllRentOrder
};
