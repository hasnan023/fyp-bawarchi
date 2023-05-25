const express = require("express");
const router = express.Router();
const Pickup = require("../structure/pickup");

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
  
module.exports = router;