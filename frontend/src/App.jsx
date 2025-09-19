import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ 1. Import the ProtectedRoute component

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar token={token} setToken={setToken} />
      <SearchBar />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        {/* ✅ 2. If a user is logged in, redirect them away from the login page */}
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
        />

        {/* --- Protected Routes --- */}
        {/* ✅ 3. Wrap private pages in the ProtectedRoute component */}
        <Route
          path="/place-order"
          element={
            <ProtectedRoute token={token}>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute token={token}>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
