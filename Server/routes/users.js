const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../structure/approve");
const jwt = require("jsonwebtoken");
const e = require("express");
const auth = require("../middlewares/auth");
const Pending = require('../structure/pending');
const ApprovedRequest = require('../structure/approve');

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
      status
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    if(userType==="customer"){
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
        status: 'active',
        verificationCode,
        resetToken,
        resetTokenExpiration
      })
      // Save the user to MongoDB
    await user.save();

    }
    else {
      const pending = new Pending({
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
        status: 'pending',
        verificationCode:'',
        resetToken:'',
        resetTokenExpiration:''
      });
    // Save the user to MongoDB
    await pending.save();
  }

    // Registration successful
    let response = { message: "Account send for approval" };
    console.log(response)

    // res.status(200).json(response);
  } catch (error) {
    console.error("Error registering user:", error);
  }
});

// Login user

router.post("/login", async (req, res) => {
  const { email, password, userType } = req.body;
  // Check if user exists
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const pending = await Pending.findOne({ email: email.toLowerCase() });
    if(!pending){
    return res.status(401).json({ message: "Invalid login credentials" });
    }
    else{
      return res.status(401).json({ message: "Account send for approval" });
    }
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



router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.phoneNumber = req.body.phoneNumber;
  user.image = req.body.image;

  user.save((err) => {
    if (err) {
      res.send(err);
      console.log("Can't update data: " + err);
    } else {
      //display in json format
      res.json(user);
      console.log("Data Updated");
    }
  });
});

// User management API endpoints
router.put('/:id/approve', (req, res) => {
  const userId = req.params.id;
  console.log(userId)

  // Find the user by ID and update the status to 'approved'
  Pending.findByIdAndUpdate(userId, { status: 'approved' }, (err, user) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: 'Failed to approve user' });
    } else {
      // Handle successful approval
      res.status(200).json({ message: 'User approved' });
    }
  });
});

router.post('/approveRequest', async (req, res) => {
 
  const requestData = req.body;

  // Create a new instance of the ApprovedRequest model
  const approvedRequest = new ApprovedRequest(requestData);

  // Save the approved request to the database
  approvedRequest.save((err) => {
    if (err) {
      console.error('Error saving approved request:', err);
      return res.status(500).json({ error: 'Failed to save approved request' });
    }

    console.log('Approved request saved:', approvedRequest);

    res.status(200).json({ message: 'Request approved successfully' });
  });

});

router.put('/:id/reject', (req, res) => {
  const userId = req.params.id;

  // Find the user by ID and update the status to 'rejected'
  Pending.findByIdAndUpdate(userId, { status: 'rejected' }, (err, user) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: 'Failed to reject user' });
    } else {
      // Handle successful rejection
      res.status(200).json({ message: 'User rejected' });
    }
  });
});

module.exports = router;
