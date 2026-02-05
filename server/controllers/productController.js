import Product from '../models/productModel.js'
import fs from 'fs'
import path from 'path'


//Get product

export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user; // from auth middleware

    const products = await Product.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Create product
export const createProduct = async (req, res) => {
    try {
    const {
      productName,
      productType,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      isReturnEligible,
    } = req.body;

    // 1️⃣ Validation
    if (
      !productName ||
      !productType ||
      quantityStock === undefined ||
      !mrp ||
      !sellingPrice ||
      !brandName
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Handle images (from multer)
    let images = [];
    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({
          success: false,
          message: "Maximum 5 images allowed",
        });
      }

      images = req.files.map((file) => file.path);
    }

    // 3️⃣ Create product
    const product = await Product.create({
      productName,
      productType,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      isReturnEligible,
      productImages: images,
      createdBy: req.user, // from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


//Update Product API

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.createdBy.toString() !== req.user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // existing images from frontend
    let existingImages = [];
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages);
    }

    // new uploaded images
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => file.path);
    }

    const finalImages = [...existingImages, ...newImages];

    if (finalImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 images allowed",
      });
    }

    product.productName = req.body.productName;
    product.productType = req.body.productType;
    product.quantityStock = req.body.quantityStock;
    product.mrp = req.body.mrp;
    product.sellingPrice = req.body.sellingPrice;
    product.brandName = req.body.brandName;
    product.isReturnEligible = req.body.returnEligible === "yes";
    product.productImages = finalImages;

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const togglePublishProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user, // ✅ FIXED
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    res.json({
      success: true,
      isPublished: product.isPublished,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user, // ✅ FIXED
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
