import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; // 1. Import context and hooks
import axios from "axios";

const PlaceOrder = () => {
  // --- This is the working logic ---
  const { getCartTotal, cartItems, token, backendUrl, clearCart } =
    useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault(); // Prevent page from reloading

    if (!token) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }
    if (getCartTotal() === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    // Simple validation to check if any field is empty
    for (const field in formData) {
      if (formData[field] === "") {
        toast.error("Please fill in all delivery information fields.");
        return;
      }
    }

    try {
      const orderData = {
        address: formData,
        items: cartItems,
        amount: getCartTotal() + 2, // Assuming a $2 delivery fee
        paymentMethod: method,
      };

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        clearCart(); // Clear the cart from frontend state
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  // --- This is your original UI, now connected to the working logic ---
  return (
    <form
      onSubmit={handlePlaceOrder} // 2. Connect the form to the handler
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Section - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zipcode"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="tel"
          placeholder="Phone Number"
        />
      </div>

      {/* Right Section - Cart Total + Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
