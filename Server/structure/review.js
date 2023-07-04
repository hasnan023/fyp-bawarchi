const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    
  customerName:{
    type: String,
    required:true
  },
  kitchenId:{
    type: String,
    required:true
  },  
  rating: {
    type: Number,
    required: true,
    minimum: 0,
    maximum: 5
  },
  review: {
    type: String,
    required: true,
  },
  createdAt :{
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Review", reviewSchema);
