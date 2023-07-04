const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema(
  {
    fullName: {
        //properties
        type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
    },
    image:{
      type: String,
    },
    expertise:{
      type: String
    },
    experience:{
      type: String
    },
    CNIC:{
      type:String,
    },
    vehicleNumber:{
      type:String,
    },
    status:{
      type:String // pending, active, rejected
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pending", pendingUserSchema);
