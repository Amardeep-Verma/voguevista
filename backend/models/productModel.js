import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  subCategory: String,
  sizes: [String],
  bestseller: { type: Boolean, default: false },
  
  // ✅ FIX: Changed from image1, image2, etc., to a single array.
  // This matches the logic in your controller.
  image: { type: [String], required: true },

}, { timestamps: true, minimize: false }); // minimize:false ensures empty arrays are saved

const productModel = mongoose.model("Product", productSchema);

export default productModel;