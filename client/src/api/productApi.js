import axios from "axios";
import React from "react";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/**
 * GET all products of logged-in user
 */
export const getMyProducts = () =>
  API.get("/products/my-products").then((res) => res.data);

/**
 * CREATE new product
 */
export const createProduct = (formData) =>
  API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);

/**
 * UPDATE product
 */
export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(res => res.data);


// DELETE PRODUCT ✅
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`).then((res) => res.data);

// TOGGLE PUBLISH ✅
export const togglePublish = (id) =>
  API.patch(`/products/${id}/toggle`).then(res => res.data);