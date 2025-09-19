import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// The component receives 'setToken' as a prop from App.jsx
const Login = ({ setToken }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get backendUrl from context
  const { backendUrl } = useContext(ShopContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const endpoint =
      currentState === "Login" ? "/api/user/login" : "/api/user/register";
    const url = `${backendUrl}${endpoint}`;

    const payload =
      currentState === "Login"
        ? { email: data.email, password: data.password }
        : data;

    try {
      const response = await axios.post(url, payload);

      if (response.data.success) {
        setToken(response.data.token); // Use the function passed via props
        localStorage.setItem("token", response.data.token);
        toast.success(
          `Successfully ${
            currentState === "Login" ? "Logged In" : "Signed Up"
          }!`
        );
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        name="email"
        onChange={onChangeHandler}
        value={data.email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        name="password"
        onChange={onChangeHandler}
        value={data.password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-blue-600"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-blue-600"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 mt-4 hover:bg-gray-800 transition disabled:bg-gray-500"
      >
        {loading
          ? "Loading..."
          : currentState === "Login"
          ? "Login"
          : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
