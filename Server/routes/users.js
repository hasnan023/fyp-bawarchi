const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../structure/user");
const jwt = require("jsonwebtoken");
const e = require("express");
const auth = require("../middlewares/auth");
//const Kitchen = require("../structure/kitchen");

//Authentication routes
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      phoneNumber,
      password,
      userType,
      image,
      expertise,
      experience,
      CNIC,
      vehicleNumber,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      address,
      phoneNumber,
      password: hashedPassword,
      userType,
      image,
      expertise,
      experience,
      vehicleNumber,
      CNIC,
    });

    // Save the user to MongoDB
    await user.save();

    // Registration successful
    let response = { message: "Registration successful" };

    // Register kitchen if user type is kitchen
    if (userType === "kitchen") {
      // Create a new kitchen document
      const kitchen = new Kitchen({ fullName, image, expertise, address });
      await kitchen.save();

      response.message = "Kitchen registered successfully";
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  // Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  // Create and send JWT token
  let token = jwt.sign({ _id: user._id, email: email }, "PrivateKey");
  const userId = user._id;
  const profilePicture = user.image;

  return res.send({
    message: "Logged in successfully",
    token,
    userId,
    name: user.fullName,
    address: user.address,
    profilePicture,
  });
});

//get single record
router.get("/:id", async (req, res) => {
  //fetch one user data and send
  try {
    //await for async return
    const user = await User.findById(req.params.id);
    //send in json format.. .send will send in text form
    res.json(user);
    console.log("Get Request by ID Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.get("/", auth, async (req, res) => {
  //fetch all users and send
  try {
    //await for async return
    const user = await User.find({ userId: req.user._id });
    //send in json format.. .send will send in text form
    res.json(user);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

module.exports = router;
