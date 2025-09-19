import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ensure this environment variable is set in your .env file
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState("");

  // This hook runs once when the app starts
  // It checks if a token exists in storage and keeps the user logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // The empty array [] ensures this effect runs only once

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      {token ? (
        <>
          <Navbar setToken={handleLogout} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Navigate to="/list" />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;
