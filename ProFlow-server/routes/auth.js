const express = require("express");
require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pawanroy2004@gmail.com",
    pass: "qkwc ztwe pftl krao",
  },
});

//function to sent the email
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:5173/onboarding-flow?code=${token}`;
  const mailOptions = {
    from: "Mailing",
    to: email,
    subject: "Verify you email",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eeeeee;
      }

      .header h1 {
        margin: 0;
        color: #333333;
      }

      .message {
        margin-top: 20px;
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      }

      .btn {
        display: inline-block;
        margin-top: 30px;
        padding: 12px 24px;
        background-color: #4caf50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }

      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>

      <div class="message">
        <p>Hello,</p>
        <p>Thank you for signing up! To complete your registration, please verify your email by clicking the button below:</p>

        <a href="${verificationLink}" class="btn">Verify Email</a>

        <p>If you did not create an account, no further action is required.</p>
      </div>

      <div class="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`,
  };
  await transporter.sendMail(mailOptions);
};

router.post("/verify-email", (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, "12345");
    res.json({ message: "verified" });
  } catch (error) {
    console.log(error);
  }
});
//to Sign up the User:-
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, "12345", { expiresIn: "1hr" });

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      emailToken: token,
    });
    await newUser.save();
    await sendVerificationEmail(email, token);
    return res.status(201).json({ message: "Verification sent Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
//to Sign in the User:-
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing Fields" });
  }
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ email }, "12345", { expiresIn: "1d" });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Let's Dive into the Proflow Setup",
         user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
       });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

module.exports = router;
