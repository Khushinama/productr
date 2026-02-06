import { Trash2, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

export default function ProductCard({
  product,
  onTogglePublish,
  onEdit,
  onDelete,
}) {
  // ✅ IMAGE SLIDER STATE
  const images = product.productImages || [];
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
   <div className="bg-white rounded-xl border shadow-lg p-4 sm:p-5">
      {/* IMAGE (UPDATED WITH SLIDER) */}
      <div className="relative h-32 sm:h-38 bg-gray-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${images[current]}`}
              alt={product.productName}
              className="h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 sm:left-3 bg-white p-1.5 rounded-full shadow"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 sm:right-3 bg-white p-1.5 rounded-full shadow"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </>
        ) : (
          <img
            src="/images/placeholder.png"
            alt="No product"
            className="h-full object-contain"
          />
        )}
      </div>

      {/* DETAILS */}
      <h3 className="font-semibold mb-2">{product.productName}</h3>
      <div className="text-sm space-y-1 sm:space-y-2 mt-1">
        <div className="flex justify-between">
          <span className="text-gray-500">Product type</span>
          <span className="text-gray-900">{product.productType}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Quantity Stock</span>
          <span className="text-gray-900">{product.quantityStock}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">MRP</span>
          <span className="text-gray-900">₹ {product.mrp}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Selling Price</span>
          <span className="text-gray-900">₹ {product.sellingPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Brand Name</span>
          <span className="text-gray-900">{product.brandName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Total Number of images</span>
          <span className="text-gray-900">{product.productImages?.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Exchange Eligibility</span>
          <span className="text-gray-900">
            {product.isReturnEligible ? "YES" : "NO"}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4">
        {/* PUBLISH / UNPUBLISH */}
        {onTogglePublish && (
          <button
            type="button"
            onClick={() => onTogglePublish(product._id)}
            className={`w-full sm:w-auto px-6 py-2 rounded-md text-md font-medium ${
              product.isPublished
                ? "bg-green-500 text-white"
                : "bg-blue-900 text-white"
            }`}
          >
            {product.isPublished ? "Unpublish" : "Publish"}
          </button>
        )}

        {/* EDIT */}
        {onEdit && (
          <button
            onClick={() => onEdit(product)}
            className="w-full sm:w-auto px-6 py-2 border rounded-md flex items-center justify-center gap-2"

          >
            <Pencil size={16} />
            Edit
          </button>
        )}

        {/* DELETE */}
        {onDelete && (
          <button
            onClick={() => onDelete(product)}
            className="w-full sm:w-auto px-4 py-3 border rounded-md text-gray-500 hover:text-red-600 flex justify-center"

          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
