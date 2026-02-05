import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // later from context

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
