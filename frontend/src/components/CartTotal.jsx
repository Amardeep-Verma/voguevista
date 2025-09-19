// CartTotal.jsx
import React, { useContext } from "react";
// Import useNavigate
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { getCartTotal, delivery_fee, currency } = useContext(ShopContext);
  const cartTotal = getCartTotal();

  // Initialize useNavigate
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full bg-gray-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold">CART TOTALS</h2>
      <div className="flex flex-col gap-3">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{currency} {cartTotal.toFixed(2)}</span>
        </div>
        {/* Delivery Fee */}
        <div className="flex justify-between text-gray-700">
          <span>Delivery Fee</span>
          <span>{currency} {delivery_fee.toFixed(2)}</span>
        </div>
        {/* Total */}
        <div className="flex justify-between text-lg font-bold border-t pt-4 mt-2">
          <span>Total</span>
          <span>{currency} {(cartTotal + delivery_fee).toFixed(2)}</span>
        </div>
      </div>
      {/* The button needs the onClick handler */}
      
    </div>
  );
};

export default CartTotal;