import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js"; // You might need this for other routes

const userRouter = express.Router();

// Public routes for registration and login
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Public route for the admin panel login
userRouter.post("/admin", adminLogin);

export default userRouter;