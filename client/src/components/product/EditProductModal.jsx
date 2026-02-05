import React, { useState } from "react";
import { updateProduct } from "../../api/productApi";
import ProductForm from "./ProductForm";
import toast from 'react-hot-toast'

export default function EditProductModal({ product, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    productName: product.productName,
    productType: product.productType,
    quantityStock: product.quantityStock,
    mrp: product.mrp,
    sellingPrice: product.sellingPrice,
    brandName: product.brandName,
    returnEligible: product.isReturnEligible ? "Yes" : "No",
  });

  // ✅ EXISTING IMAGES FROM BACKEND
  const [existingImages, setExistingImages] = useState(
    product.productImages || []
  );

  // ✅ NEW IMAGES
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const data = new FormData();

    // text fields
    Object.entries(formData).forEach(([k, v]) =>
      data.append(k, v)
    );

    // existing images user kept
    data.append("existingImages", JSON.stringify(existingImages));

    // new images user added
    images.forEach((img) => data.append("images", img));

    await updateProduct(product._id, data);
    toast.success("Product updated successfully")
    onUpdated();
    onClose();
    } catch (error) {
      toast.error("Failed to update product");
      return;
    }

   
  };

  return (
    <ProductForm
      title="Edit Product"
      submitText="Update"
      formData={formData}
      setFormData={setFormData}
      images={images}
      setImages={setImages}
      existingImages={existingImages}
      setExistingImages={setExistingImages}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}
