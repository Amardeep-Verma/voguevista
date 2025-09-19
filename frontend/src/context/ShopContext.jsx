import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const currency = "$";
  const delivery_fee = 10;

  const getProductsData = async () => {
    try {
      console.log("📡 Fetching from:", `${backendUrl}/api/product/list`);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("✅ API Response:", response.data);

      if (response.data.success) {
        setAllProducts(response.data.products);
        setProducts(response.data.products);
      } else {
        toast.error("Failed to load products.");
      }
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      toast.error("Could not load product data.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    toast.success("Added to cart!");

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const removeFromCart = (itemId, size, deleteAll = false) => {
    const cartData = { ...cartItems };
    if (cartData[itemId] && cartData[itemId][size]) {
      if (deleteAll || cartData[itemId][size] <= 1) {
        delete cartData[itemId][size];
      } else {
        cartData[itemId][size] -= 1;
      }
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.info(deleteAll ? "Item removed completely" : "Removed from cart");
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  const getCartTotal = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = allProducts.find((p) => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    allProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartTotal,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
