import React from "react";
import { Navigate } from "react-router-dom";

// This component checks if the user is authenticated and if they match the required user type
const ProtectedRoute = ({ children, requiredUserType }) => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user")); // Assuming you store the user data in localStorage

  // If there's no token or the user type does not match the required user type, redirect
  if (!token || !user || user.type !== requiredUserType) {
    return <Navigate to="/login" />;
  }

  return children; // If checks pass, render the protected route
};

export default ProtectedRoute;
