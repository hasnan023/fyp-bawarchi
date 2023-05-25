const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
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

module.exports = mongoose.model("PickupOrder", pickupSchema);
