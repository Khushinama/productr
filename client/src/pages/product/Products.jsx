import { useEffect, useState } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import AddProductModal from "../../components/product/AddProductModal";
import EditProductModal from "../../components/product/EditProductModal";
import DeleteConfirmModal from "../../components/product/DeleteProductModal";
import {
  getMyProducts,
  deleteProduct,
  togglePublish,
} from "../../api/productApi";

export default function Products({searchTerm = ""}) {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getMyProducts();
    setProducts(res.products || []);
  };

  const handleTogglePublish = async (id) => {
    await togglePublish(id);
    loadProducts();
  };

  const handleDeleteConfirm = async (id) => {
    await deleteProduct(id);
    setDeleteItem(null);
    loadProducts();
  };
 const filteredProducts = products.filter((p) =>
  (p.productName || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

  return (
  
      <div className="p-4 sm:p-6 min-h-[calc(100vh-80px)]">


        {/* HEADER (only when products exist) */}
        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

            <h2 className="text-lg font-semibold">Products</h2>
            <button
              onClick={() => {
                setEditProduct(null);
                setOpenModal(true);
              }}
              className="text-blue-900 font-medium w-full sm:w-auto text-left sm:text-right"

            >
              + Add Products
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
       {products.length === 0 && (
  <div className="flex flex-col items-center justify-center h-full text-center gap-6 mt-24">

    {/* ICON */}
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <div className="w-16 h-16 border-4 border-blue-900 rounded-xl"></div>
        <div className="w-16 h-16 border-4 border-blue-900 rounded-xl"></div>
      </div>

      <div className="w-16 h-16 border-4 border-blue-900 rounded-xl flex items-center justify-center">
        <span className="text-blue-900 text-3xl font-bold">+</span>
      </div>
    </div>

    {/* TEXT */}
    <h3 className="text-lg font-semibold text-gray-800">
      Feels a little empty over here...
    </h3>

    <p className="text-sm text-gray-500 max-w-sm">
      You can create products without connecting store
      <br />
      you can add products to store anytime
    </p>

    {/* BUTTON */}
    <button
      onClick={() => {
        setEditProduct(null);
        setOpenModal(true);
      }}
      className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-md"
    >
      Add your Products
    </button>
  </div>
)}


        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onTogglePublish={handleTogglePublish}
                onEdit={(p) => {
                  setEditProduct(p);
                  setOpenModal(true);
                }}
                onDelete={(p) => setDeleteItem(p)}
              />
            ))}
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {openModal && !editProduct && (
          <AddProductModal
            onClose={() => setOpenModal(false)}
            onSuccess={loadProducts}
          />
        )}

        {/* EDIT PRODUCT MODAL */}
        {openModal && editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={() => {
              setEditProduct(null);
              setOpenModal(false);
            }}
            onUpdated={loadProducts}
          />
        )}

        {/* DELETE CONFIRM MODAL */}
        {deleteItem && (
          <DeleteConfirmModal
            product={deleteItem}
            onClose={() => setDeleteItem(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    
  );
}
