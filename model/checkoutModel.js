const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  // Auto-generated order number
  orderNumber: {
    type: String,
    unique: true,
    default: "",
  },

  // Reference to user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Order Items (copied from cart)
  items: [
    {
      ornamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ornament",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],

  // Shipping Info
  shipping: {
    method: {
      type: String,
      enum: ["IN_STORE_PICKUP", "OUTSIDE_THE_VALLEY", "INSIDE_THE_VALLEY"],
      required: true,
    },
    cost: {
      type: Number,
      default: 0,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    province: { type: String, required: true },
    country: { type: String, default: "Nepal" },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    additionalInfo: { type: String },
  },

  // Payment Info
  payment: {
    method: {
      type: String,
      enum: ["DIRECT_BANK_TRANSFER", "CASH_ON_DELIVERY", "ESEWA", "KHALTI"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    transactionId: { type: String },
  },

  // Pricing Summary
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  total: { type: Number, required: true },

  // Order Status
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },

  // Notes
  customerNotes: { type: String },
  adminNotes: { type: String },
}, {
  timestamps: true,
});

// 🔢 Generate unique order number before saving
OrderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `STY-${Date.now().toString().slice(-6)}-${(count + 1)
      .toString()
      .padStart(3, "0")}`;
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
