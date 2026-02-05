import { useEffect, useState } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import AddProductModal from "../../components/product/AddProductModal";
import DeleteConfirmModal from "../../components/product/DeleteProductModal";
import {
  getMyProducts,
  deleteProduct,
  togglePublish,
} from "../../api/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getMyProducts();
    setProducts(res.products);
  };
const handleTogglePublish = async (id) => {
  await togglePublish(id);
  loadProducts(); // refetch list
};
  const handleDeleteConfirm = async (id) => {
    await deleteProduct(id);
    setDeleteItem(null);
    loadProducts();
  };

  return (
    <Layout>
      <div className="p-6">

        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">Products</h2>
          <button
            onClick={() => {
              setEditProduct(null);
              setOpenModal(true);
            }}
            className="text-blue-900 font-medium"
          >
            + Add Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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

        {openModal && (
          <AddProductModal
            onClose={() => setOpenModal(false)}
            editProduct={editProduct}
            onSuccess={loadProducts}
          />
        )}

        {deleteItem && (
          <DeleteConfirmModal
            product={deleteItem}
            onClose={() => setDeleteItem(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </Layout>
  );
}
