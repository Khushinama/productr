import { useState } from "react";
import { X } from "lucide-react";
import { updateProduct } from "../../api/productApi";

export default function EditProductModal({ product, onClose, onUpdated }) {
 const [formData, setFormData] = useState({
  productName: product.productName || "",
  productType: product.productType || "",
  quantityStock: product.quantityStock || "",
  mrp: product.mrp || "",
  sellingPrice: product.sellingPrice || "",
  brandName: product.brandName || "",
  returnEligible: product.isReturnEligible ? "yes" : "no",
});


const [existingImages, setExistingImages] = useState(
  product.productImages || []
);
  const [newImages, setNewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    const total = existingImages.length + newImages.length + files.length;

    if (total > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setNewImages([...newImages, ...files]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // existing images (stringified)
    data.append("existingImages", JSON.stringify(existingImages));

    // new images
    newImages.forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await updateProduct(product._id, data);
      onUpdated(res.product); // refresh list
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between px-6 py-4 border-b">
          <h2 className="font-semibold">Edit Product</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="px-6 py-4 space-y-4 overflow-y-auto"
        >
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="number"
            name="quantityStock"
            value={formData.quantityStock}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full border p-2"
          />

          {/* IMAGES */}
          <div>
            <label>Add Images</label>
            <input type="file" multiple onChange={handleNewImages} />

            <div className="flex gap-2 mt-2 flex-wrap">
              {existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-16 h-16 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute -top-1 -right-1 bg-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-blue-900 text-white px-4 py-2 rounded">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
