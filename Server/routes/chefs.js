const express = require("express");
const router = express.Router();
const Chef = require("../structure/user");

router.get("/", async (req, res) => {
    //fetch all kithcens and send
    try {
      const chef = await Chef.find({ userType: "chef" });
      //send in json format.. .send will send in text form
      res.json(chef);
      console.log("Get Request Worked");
      console.log("hello")
    } catch (err) {
      res.send("Error: " + err);
    }
});

module.exports = router;

  