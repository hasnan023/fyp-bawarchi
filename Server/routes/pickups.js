const express = require("express");
const router = express.Router();
const Order = require("../structure/order");

router.post("/", async (req, res) => {
    try {
      const order = new Order(req.body);
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;