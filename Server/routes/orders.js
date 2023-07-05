const express = require("express");
const router = express.Router();
const Order = require("../structure/order");

// Create a new order
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

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific order by ID
router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

// Update an existing order
router.put("/:id", getOrder, async (req, res) => {
  try {
    res.order.status = req.body.status;
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order
router.delete("/", async (req, res) => {
  try {
    //delete all
    await Order.deleteMany();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Middleware to get a specific order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.order = order;
  next();
}

module.exports = router;
