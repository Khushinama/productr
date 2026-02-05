import { useState } from "react";
import React from "react";
import { createProduct } from "../../api/productApi";
import ProductForm from "./ProductForm";
import toast from 'react-hot-toast'

export default function AddProductModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    returnEligible: "Yes",
  });

  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    images.forEach((img) => data.append("images", img));

    await createProduct(data);
    toast.success("Product created successfully");
    onSuccess();
    onClose();
    } catch (error) {
      toast.error("Failed to create product");
      return;
    }
    
  };

  return (
    <ProductForm
      title="Add Product"
      submitText="Create"
      formData={formData}
      setFormData={setFormData}
      images={images}
      setImages={setImages}
      existingImages={[]}
      setExistingImages={() => {}}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}
