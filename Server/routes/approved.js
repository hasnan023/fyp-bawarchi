const express = require("express");
const router = express.Router();
const Approved = require('../structure/approve');

router.get("/", async (req, res) => {
    //fetch all users and send
    try {
      //await for async return
      const approve = await Approved.find ();
      //send in json format.. .send will send in text form
      res.json(approve);
      console.log("Get Request Worked");
    } catch (err) {
      res.send("Error: " + err);
    }
  });

  module.exports = router;
