import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// ✅ 1. Accept 'token' and 'setToken' as props
const Navbar = ({ token, setToken }) => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ 2. Create a working logout function
  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setToken("");
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Left side with Logo */}
      <Link to="/">
        <p className="prata-regular text-2xl font-bold">VogueVista</p>
      </Link>

      {/* Right side menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          HOME
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          COLLECTION
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          ABOUT
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          CONTACT
        </NavLink>
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-[20px]" alt="Cart" />
          <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[8px]">
            {getCartCount()}
          </div>
        </Link>

        {/* ✅ 3. Conditional logic for Login vs. Profile Icon */}
        {!token ? (
          // If NOT logged in, show a login button
          <Link to="/login">
            <button className="border border-gray-400 px-6 py-1.5 rounded-full text-sm hover:bg-gray-100">
              Login
            </button>
          </Link>
        ) : (
          // If LOGGED IN, show profile icon with a functional dropdown
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-5 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <ul className="absolute right-0 top-8 z-10 bg-white shadow-lg rounded-md p-2 w-40 border">
                <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <Link to="/orders" onClick={() => navigate("/orders")}>
                    Orders
                  </Link>
                </li>
                <hr className="my-1" />
                <li
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Mobile menu button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar menu for small screens (your existing code is fine) */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
