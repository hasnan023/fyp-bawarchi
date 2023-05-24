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
    paymentMethod: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    address:{
      type:String,
      required:true
    },
    phoneNumber:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodOrder", orderSchema);
