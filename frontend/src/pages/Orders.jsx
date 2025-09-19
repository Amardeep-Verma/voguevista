import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      {/* Page Title */}
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders List */}
      {products.slice(1, 4).map((item, index) => (
        <div
          key={index}
          className="py-6 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* Left: Product Info */}
          <div className="flex items-start gap-6 text-sm">
            <img
              className="w-16 sm:w-20 rounded-md"
              src={item.image[0]}
              alt={item.name}
            />

            <div className="flex flex-col gap-1">
              <p className="font-medium text-base">{item.name}</p>
              <p className="text-gray-600">
                {currency}
                {item.price} &nbsp; • &nbsp; Quantity: 1 &nbsp; • &nbsp; Size: M
              </p>
              <p className="text-gray-500 text-sm">Date: 25, Jul, 2024</p>
            </div>
          </div>

          {/* Right: Status + Track Button */}
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <p className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Ready to ship
            </p>
            <button className="border px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
