const express = require("express");
const router = express.Router();
const Food = require("../structure/detail");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    //await for async return
    const food = await Food.find({ userId: req.user._id });
    //send in json format.. .send will send in text form
    res.json(food);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

//get single record
router.get("/:id", async (req, res) => {
  //fetch one food item and send
  try {
    //await for async return
    const food = await Food.findById(req.params.id);
    //send in json format.. .send will send in text form
    res.json(food);
    console.log("Get Request by ID Worked");
  } catch (err) {
    res.send("Error: " + err);
    console.log("didnt work");
  }
});

//insert data in database
router.post("/", auth, async (req, res, next) => {
  console.log(req.user);
  let food = new Food();
  food.name = req.body.name;
  food.price = req.body.price;
  food.description = req.body.description;
  food.userId = req.user._id;
  food.image = req.body.image;
  food.addedBy = req.user._id;
  await food.save();
  res.send(food);
});

//update/patch a record
router.put("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  food.name = req.body.name;
  food.price = req.body.price;
  food.description = req.body.description;

  food.save((err) => {
    if (err) {
      res.send(err);
      console.log("Can't update data: " + err);
    } else {
      //display in json format
      res.json(food);
      console.log("Data Updated");
    }
  });
});

//delete a record
router.delete("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  food.remove((err) => {
    if (err) {
      res.send(err);
      console.log("Can't delete record: " + err);
    } else {
      //display in json format
      res.json("Record Deleted");
      console.log("Record Deleted");
    }
  });
});

module.exports = router;
