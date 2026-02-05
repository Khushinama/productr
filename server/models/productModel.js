import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productType: {
      type: String,
      required: true,
    },

    quantityStock: {
      type: Number,
      required: true,
      min: 0,
    },

    mrp: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    brandName: {
      type: String,
      required: true,
    },
    
    productImages: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "You can upload maximum 5 images",
      },
    },

    isReturnEligible: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
