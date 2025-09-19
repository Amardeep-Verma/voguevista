import express from "express";
import multer from "multer";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";

const upload = multer({ dest: "uploads/" });
const productRouter = express.Router();

// Add Product (Protected)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// List Products (Public)
productRouter.get("/list", listProducts);

// Remove Product (Protected)
productRouter.post("/remove", adminAuth, removeProduct);



// Get Single Product (Public)
productRouter.post("/single", singleProduct);

export default productRouter;
