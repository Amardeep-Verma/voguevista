import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  if (token) {
    return children; // If user is logged in, render the component
  } else {
    return <Navigate to="/login" />; // If not, redirect to the login page
  }
};

export default ProtectedRoute;
