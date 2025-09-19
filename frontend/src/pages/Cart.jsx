import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, addToCart, removeFromCart, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const formatPrice = (amount) => `${currency} ${amount.toFixed(2)}`;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-6">YOUR CART</h2>

        {cartData.length > 0 ? (
          <div className="space-y-6">
            {cartData.map((cartItem) => {
              const product = products.find((p) => p._id === cartItem._id);
              if (!product) return null;

              const productImage = Array.isArray(product.image)
                ? product.image[0]
                : product.image || assets.placeholder;

              return (
                <div
                  key={`${cartItem._id}-${cartItem.size}`}
                  className="flex items-center justify-between border-b pb-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {cartItem.size}
                      </p>

                      {/* Unit Price */}
                      <p className="text-gray-600 text-sm">
                        Unit Price: {formatPrice(product.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            removeFromCart(cartItem._id, cartItem.size)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          ➖
                        </button>
                        <span className="font-medium">{cartItem.quantity}</span>
                        <button
                          onClick={() => addToCart(cartItem._id, cartItem.size)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          ➕
                        </button>
                      </div>

                      {/* Total for this product */}
                      <p className="font-semibold mt-2">
                        {formatPrice(product.price * cartItem.quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Delete Icon */}
                  <img
                    src={assets.bin_icon}
                    alt="Delete"
                    onClick={() =>
                      removeFromCart(cartItem._id, cartItem.size, true)
                    }
                    className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Cart Total Section */}
      <div>
        <CartTotal />

        {/* Proceed to Checkout Button */}
        {cartData.length > 0 && (
          <button
            onClick={() => navigate("/place-order")}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full mt-4"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
