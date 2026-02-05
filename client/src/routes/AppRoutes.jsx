import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";
import AuthPage from "../pages/auth/AuthPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Products from "../pages/product/Products";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {/* HOME / DASHBOARD */}
       <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/products"
  element={
    <PrivateRoute>
      <Products />
    </PrivateRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
