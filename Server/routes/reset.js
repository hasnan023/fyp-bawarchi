const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../structure/approve")

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
    user.resetToken = token;
    user.resetTokenokenExpiration = Date.now() + 3600000;
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
        res.status(500).json({ message: "An error occurred. Please try again later." });
      } else {
        console.log("Email sent:", info.response);
        res.json({ message: "Password reset email sent successfully." });
      }
    });
  }
});

module.exports = router;