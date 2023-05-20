const express = require("express");
const router = express.Router();
const Kitchen = require("../structure/user");
const Food = require("../structure/detail")

router.get("/", async (req, res) => {
  //fetch all food and send
  try {
    const kitchen = await Kitchen.find();
    //send in json format.. .send will send in text form
    res.json(kitchen);
    console.log("Get Request Worked");
    
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const kitchenId = req.params.id;
    const kitchen = await Kitchen.findById(kitchenId);

    if (!kitchen) {
      return res.status(404).json({ error: "Kitchen not found" });
    }

    const foodItems = await Food.find({ userId: kitchenId, addedBy: kitchenId });

    res.json({
      kitchen,
      foodItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
