const mongoose = require("mongoose");

const RentOrderSchema = new mongoose.Schema(
  {
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

    items: [
      {
        RentornamentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RentOrnament",
          required: true,
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

    // Rent Dates
    rentStartDate: { type: Date, required: true },
    rentEndDate: { type: Date, required: true },

    // Order Status
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

// 🔢 Generate unique order number before saving
RentOrderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `STY-${Date.now().toString().slice(-6)}-${(count + 1)
      .toString()
      .padStart(3, "0")}`;
  }
  next();
});

const RentOrder = mongoose.model("RentOrder", RentOrderSchema);
module.exports = RentOrder;
