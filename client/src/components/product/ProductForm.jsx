import { X } from "lucide-react";
import React, { useState } from "react";

export default function ProductForm({
  title,
  formData,
  setFormData,
  images,
  setImages,
  existingImages = [],
  setExistingImages,
  onSubmit,
  submitText,
  onClose,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - (images.length + existingImages.length);

    if (remainingSlots <= 0) {
      return alert("You can upload maximum 5 images");
    }

    const allowedFiles = files.slice(0, remainingSlots);
    setImages([...images, ...allowedFiles]);
    setErrors({ ...errors, images: "" });
  };

  const removeExisting = (i) => {
    setExistingImages(existingImages.filter((_, idx) => idx !== i));
  };

  const removeNew = (i) => {
    setImages(images.filter((_, idx) => idx !== i));
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!formData.productName.trim())
      newErrors.productName = "Please enter product name";

    if (!formData.productType)
      newErrors.productType = "Please select product type";

    if (!formData.quantityStock)
      newErrors.quantityStock = "Please enter quantity stock";

    if (!formData.mrp)
      newErrors.mrp = "Please enter MRP";

    if (!formData.sellingPrice)
      newErrors.sellingPrice = "Please enter selling price";

    if (!formData.brandName.trim())
      newErrors.brandName = "Please enter brand name";

    if (images.length === 0 && existingImages.length === 0)
      newErrors.images = "Please upload at least one image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-0">
  <div className="bg-white w-full max-w-md rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">


        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b">

          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* FORM */}
        <form
  onSubmit={handleSubmit}
  className="px-4 sm:px-6 py-4 sm:py-5 space-y-4"
>


          {/* PRODUCT NAME */}
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              name="productName"
              value={formData.productName}
              placeholder="Enter product name"
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.productName ? "border-red-500" : ""
              }`}
            />
            {errors.productName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.productName}
              </p>
            )}
          </div>

          {/* PRODUCT TYPE */}
          <div>
            <label className="text-sm font-medium">Product Type</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.productType ? "border-red-500" : ""
              }`}
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

          {/* QUANTITY */}
          <div>
            <label className="text-sm font-medium">Quantity Stock</label>
            <input
              name="quantityStock"
              value={formData.quantityStock}
              placeholder="Enter stock quantity"
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.quantityStock ? "border-red-500" : ""
              }`}
            />
            {errors.quantityStock && (
              <p className="text-xs text-red-500 mt-1">
                {errors.quantityStock}
              </p>
            )}
          </div>

          {/* MRP */}
          <div>
            <label className="text-sm font-medium">MRP</label>
            <input
              name="mrp"
              value={formData.mrp}
              placeholder="Enter MRP"
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.mrp ? "border-red-500" : ""
              }`}
            />
            {errors.mrp && (
              <p className="text-xs text-red-500 mt-1">{errors.mrp}</p>
            )}
          </div>

          {/* SELLING PRICE */}
          <div>
            <label className="text-sm font-medium">Selling Price</label>
            <input
              name="sellingPrice"
              value={formData.sellingPrice}
              placeholder="Enter selling price"
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.sellingPrice ? "border-red-500" : ""
              }`}
            />
            {errors.sellingPrice && (
              <p className="text-xs text-red-500 mt-1">
                {errors.sellingPrice}
              </p>
            )}
          </div>

          {/* BRAND */}
          <div>
            <label className="text-sm font-medium">Brand Name</label>
            <input
              name="brandName"
              value={formData.brandName}
              placeholder="Enter brand name"
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.brandName ? "border-red-500" : ""
              }`}
            />
            {errors.brandName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.brandName}
              </p>
            )}
          </div>

          {/* IMAGES */}
          <div>
            <label className="text-sm font-medium">Upload Product Images</label>
            <div className="mt-1 border border-dashed rounded-md p-4 text-center">
               <input
                type="file"
                name="images" // ✅ ADD THIS LINE
                multiple
                onChange={handleImages}
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              {existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${img}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover"

                  />
                  <button
                    type="button"
                    onClick={() => removeExisting(i)}
                    className="absolute -top-1 -right-1 bg-white rounded"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
                    className="absolute -top-1 -right-1 bg-white rounded"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {existingImages.length + images.length} / 5 images selected
            </p>

            {errors.images && (
              <p className="text-xs text-red-500 mt-1">{errors.images}</p>
            )}
          </div>

          {/* RETURN */}
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
          <div className="flex justify-center sm:justify-end pt-4">

            <button className="w-full sm:w-auto bg-blue-900 text-white px-6 py-2 rounded-md">

              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
