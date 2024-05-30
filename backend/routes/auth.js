const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  console.log("Received signup request:", { userName, email });

  if (!userName || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      if (existingUser.email === email) {
        console.log("User with this email already exists:", email);
        return res.status(400).send("User with this email already exists");
      } else if (existingUser.userName === userName) {
        console.log("User with this username already exists:", userName);
        return res.status(400).send("User with this username already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    console.log("User created successfully:", user);
    res.status(201).json({ userId: user._id, token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("Error signing up");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    console.log("User logged in successfully:", user);
    res.status(200).json({ userId: user._id, userName: user.userName, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});
router.post("/logout", (req, res) => {
  // Optionally, you can handle any server-side cleanup here
  res.status(200).send("User logged out successfully");
});

module.exports = router;
