const express = require("express");
const router = express.Router();
const Pending = require('../structure/pending');

router.get("/", async (req, res) => {
    //fetch all users and send
    try {
      //await for async return
      const pending = await Pending.find ({ status: 'pending' });
      //send in json format.. .send will send in text form
      res.json(pending);
      console.log("Get Request Worked");
    } catch (err) {
      res.send("Error: " + err);
    }
  });

  module.exports = router;
