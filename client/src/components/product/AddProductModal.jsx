import { useState } from "react";
import React from "react";
import { X } from "lucide-react";
import { createProduct } from "../../api/productApi";

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      return alert("You can upload maximum 5 images");
    }

    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!formData.productName)
      newErrors.productName = "Please enter product name";
    if (!formData.productType)
      newErrors.productType = "Please select product type";
    if (!formData.quantityStock)
      newErrors.quantityStock = "Please enter stock quantity";
    if (!formData.mrp) newErrors.mrp = "Please enter MRP";
    if (!formData.sellingPrice)
      newErrors.sellingPrice = "Please enter selling price";
    if (!formData.brandName)
      newErrors.brandName = "Please enter brand name";
    if (images.length === 0)
      newErrors.images = "Please upload at least one image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );

      images.forEach((img) => payload.append("images", img));

      const res = await createProduct(payload);

      if (res.success) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">Add Product</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">

          {/* Product Name */}
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.productName && "border-red-500"
              }`}
            />
            {errors.productName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.productName}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div>
            <label className="text-sm font-medium">Product Type</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option value="">Select product type</option>
              <option value="Foods">Foods</option>
              <option value="Grocery">Grocery</option>
            </select>
            {errors.productType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.productType}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium">Quantity Stock</label>
            <input
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          {/* MRP */}
          <div>
            <label className="text-sm font-medium">MRP</label>
            <input
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label className="text-sm font-medium">Selling Price</label>
            <input
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          {/* Brand Name */}
          <div>
            <label className="text-sm font-medium">Brand Name</label>
            <input
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          {/* Images */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">
                Upload Product Images
              </label>
              <label
                htmlFor="images"
                className="text-blue-900 text-sm cursor-pointer"
              >
                Add More Photos
              </label>
            </div>

            <input
              type="file"
              id="images"
              multiple
              hidden
              accept="image/*"
              onChange={handleImages}
            />

            <div className="border border-dashed rounded-md p-3 flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative w-16 h-16">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-1 -right-1 bg-white rounded-full"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {errors.images && (
              <p className="text-xs text-red-500 mt-1">
                {errors.images}
              </p>
            )}
          </div>

          {/* Exchange */}
          <div>
            <label className="text-sm font-medium">
              Exchange or return eligibility
            </label>
            <select
              name="returnEligible"
              value={formData.returnEligible}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end pt-4">
            <button
              disabled={loading}
              className="bg-blue-900 text-white px-6 py-2 rounded-md"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
