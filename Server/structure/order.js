const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    foodItems: {
      type: Array,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    kitchenName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodOrder", orderSchema);
