const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../structure/approve");
const bcrypt = require("bcryptjs");

router.post("/", async(req, res) => {
  const { email } = req.body;
  console.log(email)
  
  const user = await User.findOne({ email});
  if(!user){
    console.error({success:false, message: "No user"});
    return res.send({success:false, message: "No user"});
  }
  else {
    
    const token = crypto.randomBytes(3).toString("hex");
    console.log( user)
    console.log( user.resetToken)
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    console.log( user.resetToken),
    console.log( user.resetTokenExpiration),
    await user.save();

    // Send password reset email
    const transporter = nodemailer.createTransport({
      // Configure your email provider details here
      service: "gmail",
      auth: {
        user: "marwakhalid558@gmail.com",
        pass: "mhdflyyuejyszoiw",
      },
    });

    const mailOptions = {
      from: "marwakhalid558@gmail.com",
      to: email,
      subject: "Password Reset Link",
      html: `<p>You have requested a password reset. Here is the code to reset your password:</p>
      <a href="${token}">${token}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success:false, message: "An error occurred. Please try again later." });
      } else {
        console.log("Email sent:", info.response);
        res.json({ success:true ,message: "Password reset email sent successfully." });
      }
    });
  }
});

router.post("/confirm", async(req, res) => {
  try{
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    const password = req.body.password;
    const user = await User.findOne({email});

    // if(!passwordStrength.strong){
    //   return res.send({success:false, message: "No user"});
    // }
    if(!user || user.resetToken != verificationCode){
      return res.status(400).send({success:false});
    }
    if(user.resetTokenExpiration< new Date()){
      return res.status(400).send({success:false, message:"Token has expired"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    console.log(user.password)
    user.resetToken = '';
    user.resetTokenExpiration = null;
    await user.save();
  }
  catch(err){
    console.log(err);
    return res.status(500).send({success:false, message:"error"})
  }
});

module.exports = router;