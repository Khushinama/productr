import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  togglePublishProduct,
} from "../controllers/productController.js";
import { uploadProductImages } from "../config/multerconfig.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  uploadProductImages.array("images", 5),
  createProduct
);

// READ (user products)
router.get("/my-products", protect, getMyProducts);

// UPDATE
router.put(
  "/:id",
  protect,
  uploadProductImages.array("images", 5),
  updateProduct
);

// DELETE ✅
router.delete("/:id", protect, deleteProduct);

// TOGGLE PUBLISH ✅
router.patch("/:id/toggle", protect, togglePublishProduct);

export default router;
