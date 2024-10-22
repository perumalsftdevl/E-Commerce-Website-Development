const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  if (user) {
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access to cookies
      secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
      sameSite: "None", // Ensures cookies are sent across origins
    });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token, // This can be omitted as it's the same as the key name
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access to cookies
      secure: process.env.NODE_ENV === "production", // Set to true if in production (HTTPS)
      sameSite: "None", // Ensure to set this properly based on your needs
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds (optional)
    });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(401).json({
      msg: "Invalid email or password",
    });
  }
});

module.exports = { registerUser, loginUser };
