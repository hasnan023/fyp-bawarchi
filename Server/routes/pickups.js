const express = require("express");
const router = express.Router();
const Pickup = require("../structure/pickup");
const Order = require("../structure/order")

router.post("/", async (req, res) => {
  try {
    const pickup = new Pickup(req.body);
    const savedPickup = await pickup.save();
    res.status(201).json(savedPickup);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
  
router.get("/", async (req, res) => {
  try {
    const pickups = await Pickup.find();
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(":id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  order.remove((err) => {
    if (err) {
      res.send(err);
      console.log("Can't delete order: " + err);
    } else {
      res.json("Order Deleted");
      console.log("Order Deleted");
    }
  });
});
  
module.exports = router;