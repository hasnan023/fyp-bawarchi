//handle only one record
//schema for database

const mongoose = require("mongoose");

const userDetail = new mongoose.Schema({
  fullName: {
    //properties
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
    required:true
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
  }
});

//export schema
module.exports = mongoose.model("User", userDetail);
