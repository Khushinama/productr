import { useEffect, useState } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import EmptyState from "./EmptyState";
import EditProductModal from "../../components/product/EditProductModal";
import { getMyProducts, togglePublish } from "../../api/productApi";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("published");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ EDIT STATE

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

  // ✅ EDIT HANDLER
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const publishedProducts = products.filter((p) => p.isPublished);
  const unpublishedProducts = products.filter((p) => !p.isPublished);

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        {/* TABS */}
        <div className="mb-8">
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("published")}
              className={`pb-4 px-2 font-medium relative ${
                activeTab === "published"
                  ? "text-gray-900"
                  : "text-gray-500"
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
                activeTab === "unpublished"
                  ? "text-gray-900"
                  : "text-gray-500"
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
        {activeTab === "published" && !loading && (
          publishedProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onTogglePublish={handleTogglePublish}
                  onEdit={handleEditProduct} // ✅ EDIT
                />
              ))}
            </div>
          )
        )}

        {/* UNPUBLISHED */}
        {activeTab === "unpublished" && !loading && (
          unpublishedProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {unpublishedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onTogglePublish={handleTogglePublish}
                  onEdit={handleEditProduct} // ✅ EDIT
                />
              ))}
            </div>
          )
        )}

        {/* ✅ EDIT MODAL */}
        {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdated={fetchProducts}
          />
        )}
      </div>
    </Layout>
  );
}
