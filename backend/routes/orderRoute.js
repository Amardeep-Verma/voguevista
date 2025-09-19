import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// --- User features ---
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/userorders", authMiddleware, userOrders);

// --- Admin features ---
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
