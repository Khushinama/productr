import { Trash2, Pencil } from "lucide-react";
import React from "react";

export default function ProductCard({
  product,
  onTogglePublish,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">

      {/* IMAGE */}
      <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
        <img
          src={
            product.productImages?.length
              ? `http://localhost:5000/${product.productImages[0]}`
              : "/images/placeholder.png"
          }
          alt={product.productName}
          className="h-full object-contain"
        />
      </div>

      {/* DETAILS */}
      <h3 className="font-semibold mb-2">{product.productName}</h3>

      <div className="text-sm text-gray-500 space-y-1">
        <p>Product type - {product.productType}</p>
        <p>Quantity Stock - {product.quantityStock}</p>
        <p>MRP - ₹ {product.mrp}</p>
        <p>Selling Price - ₹ {product.sellingPrice}</p>
        <p>Brand Name - {product.brandName}</p>
        <p>Total Number of images - {product.productImages?.length}</p>
        <p>Exchange Eligibility - {product.isReturnEligible ? "YES" : "NO"}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2 mt-4">

        {/* PUBLISH / UNPUBLISH */}
        {onTogglePublish && (
          <button
            type="button"
            onClick={() => onTogglePublish(product._id)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
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
            className="px-4 py-2 border rounded-md flex items-center gap-1"
          >
            <Pencil size={16} />
            Edit
          </button>
        )}

        {/* DELETE */}
        {onDelete && (
          <button
            onClick={() => onDelete(product)}
            className="p-2 border rounded-md text-gray-500 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
