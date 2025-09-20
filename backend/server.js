import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Database and Cloudinary Connections
connectDB();
connectCloudinary();

// Auto-create Admin User Script
const createAdminAccount = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminExists = await userModel.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("Admin account already exists.");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    await userModel.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error creating admin account:", error);
  }
};
createAdminAccount();

// Middlewares
app.use(express.json());

// --- ✅ CORS Configuration Fix ---
// This allows both of your frontend applications to make requests.
const corsOptions = {
  origin: ["https://voguevista-frontend.vercel.app/"], // Add all frontend URLs here
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// --- End of Fix ---

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root URL for basic API health check
app.get("/", (req, res) => {
  res.send("API is Working");
});

// Start the server
app.listen(port, () => console.log(`Server started on Port: ${port}`));
