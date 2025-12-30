import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: ["title", "Product title is required"],
    },
    image: {
      type: String,
      required: ["image", "Product image is required"],
    },
    productType: {
      type: String,
      required: ["productType", "Product type is required"],
      enum:["t-shirt","all"],
      default:"all"
    },
    price: {
      type: Number,
      required: ["price", "Product price is required"],
    },
    description: {
      type: String,
      required: ["description", "Product description is required"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
      required: ["link", "Product link is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
