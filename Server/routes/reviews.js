const express = require("express");
const router = express.Router();
const Review = require("../structure/review")

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const review = await Review.find({ kitchenId: req.params.id });

    res.json(review);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.post('/', async (req, res) => {

    const { kitchenId, customerName, rating, review} = req.body;
  
    const newReview = new Review ({
      kitchenId,
      customerName,
      rating,
      review,
      createdAt: new Date(),
    });

    await newReview.save();
  
    res.status(201).json(newReview);
  });
  
  
module.exports = router;