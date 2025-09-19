import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const imageFiles = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(file => file !== undefined);

    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      // ✅ FIX: Standardized to 'bestseller' (all lowercase) to match model
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: "Failed to add product" });
  }
};

// LIST ALL PRODUCTS
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    // ✅ FIX: Sending data with 'products' key to match frontend expectation
    res.json({ success: true, products: products });
  } catch (error) {
    console.error("Error listing products:", error);
    res.json({ success: false, message: "Failed to list products" });
  }
};

// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.json({ success: false, message: "Failed to remove product" });
  }
};

// SINGLE PRODUCT INFO
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.json({ success: false, message: "Failed to fetch product" });
  }
};

// ✅ FIX: ADDED THE MISSING EDIT PRODUCT FUNCTION
const editProduct = async (req, res) => {
  try {
    const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body;
    
    // Convert incoming form value to a proper boolean
    const isBestseller = bestseller === 'true' || bestseller === true || bestseller === 'on';

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price: Number(price),
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: isBestseller,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product Updated Successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.json({ success: false, message: "Failed to update product" });
  }
};

// ✅ FIX: Added 'editProduct' to the export list
export { addProduct, listProducts, removeProduct, singleProduct, editProduct };