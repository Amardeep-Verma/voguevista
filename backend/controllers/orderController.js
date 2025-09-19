import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
    });
    await newOrder.save();

    // After placing an order, clear the user's cart from the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

// --- COMPLETED FUNCTIONS ---

// (Admin) List all orders for the admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

// (User) List all orders for a specific user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

// (Admin) Update an order's status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status: status });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus };
