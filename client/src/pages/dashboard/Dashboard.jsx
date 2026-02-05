import { useEffect, useState } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import EmptyState from "./EmptyState";
import EditProductModal from "../../components/product/EditProductModal";
import DeleteProductModal from "../../components/product/DeleteProductModal";
import {
  getMyProducts,
  togglePublish,
  deleteProduct,
} from "../../api/productApi";

export default function Dashboard({ searchTerm = "" }) {
  const [activeTab, setActiveTab] = useState("published");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getMyProducts();
      if (res.success) {
        setProducts(res.products);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTogglePublish = async (id) => {
    await togglePublish(id);
    fetchProducts();
  };

  // ✅ EDIT
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  // ✅ DELETE CONFIRM
  const handleDeleteConfirm = async (id) => {
    await deleteProduct(id);
    setDeleteItem(null);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    (p.productName || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const publishedProducts = filteredProducts.filter((p) => p.isPublished);
  const unpublishedProducts = filteredProducts.filter((p) => !p.isPublished);

  return (
   <div className="p-4 sm:p-6 lg:p-8">
      {/* TABS */}
      <div className="mb-8">
        <div className="flex gap-6 sm:gap-8 border-b border-gray-200 overflow-x-auto">

          <button
            onClick={() => setActiveTab("published")}
            className={`pb-4 px-2 font-medium relative ${
              activeTab === "published" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Published
            {activeTab === "published" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("unpublished")}
            className={`pb-4 px-2 font-medium relative ${
              activeTab === "unpublished" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Unpublished
            {activeTab === "unpublished" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      {/* PUBLISHED */}
      {activeTab === "published" &&
        !loading &&
        (publishedProducts.length === 0 ? (
          <EmptyState
            title="No Published Products"
            subtitle="Your Published Products will appear here"
            hint="Create your first product to publish"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onTogglePublish={handleTogglePublish}
                onEdit={handleEditProduct}
                onDelete={(p) => setDeleteItem(p)}
              />
            ))}
          </div>
        ))}

      {/* UNPUBLISHED */}
      {activeTab === "unpublished" &&
        !loading &&
        (unpublishedProducts.length === 0 ? (
          <EmptyState
            title="No Unpublished Products"
            subtitle="Your Unpublished Products will appear here"
            hint="Publish your products to make them visible to customers"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unpublishedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onTogglePublish={handleTogglePublish}
                onEdit={handleEditProduct}
                onDelete={(p) => setDeleteItem(p)}
              />
            ))}
          </div>
        ))}

      {/* ✅ EDIT MODAL */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={fetchProducts}
        />
      )}

      {/* ✅ DELETE MODAL */}
      {deleteItem && (
        <DeleteProductModal
          product={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
