import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/layout/Layout";
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
      <Layout>
        <Dashboard />
      </Layout>
    </PrivateRoute>
  }
/>

<Route
  path="/products"
  element={
    <PrivateRoute>
      <Layout>
        <Products />
      </Layout>
    </PrivateRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
