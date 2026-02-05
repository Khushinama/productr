import { X } from "lucide-react";
import React from "react";
import toast from 'react-hot-toast'

export default function DeleteProductModal({ product, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 p-5 sm:p-6 relative">


        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-2">Delete Product</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you really want to delete this product
          <br />
          <strong>“{product.name}”</strong>?
        </p>

        <div className="flex flex-col sm:flex-row justify-end gap-3">

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border rounded-md"

          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product._id)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-900 text-white rounded-md"

          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
