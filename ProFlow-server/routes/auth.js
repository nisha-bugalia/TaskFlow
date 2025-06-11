const express = require("express");
require('dotenv').config();
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "pawanroy2004@gmail.com",
        pass: "qkwc ztwe pftl krao",
    }
})

//function to sent the email
const sendVerificationEmail= async(email,token)=>{
    const verificationLink=`www.xnxx.com`
    const mailOptions={
        from:'Mailing',
        to:email,
        subject:"Verify you email",
        html:`<p>Click to verify your email:<a href="${verificationLink}">here</a></p>`
    }
    await transporter.sendMail(mailOptions);
}



//to Sign up the User
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      tokenExpiry: Date.now() + 3600000,
      emailToken: token,
    });
    await newUser.save();
    await sendVerificationEmail(email,token);
    return res.status(201).json({ message: "Verification sent Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//
module.exports = router;
