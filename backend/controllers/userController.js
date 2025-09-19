import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper function to create a complete token
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
};

// Login for regular users
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id, user.role);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id, user.role);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// ✅ FINAL, CORRECTED ADMIN LOGIN FUNCTION
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user and explicitly request the password field
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user's role is 'admin'
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied: Not an admin account" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create a complete token that includes the user's role
    const token = createToken(user._id, user.role);
    res.json({ success: true, token });

  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { loginUser, registerUser, adminLogin };