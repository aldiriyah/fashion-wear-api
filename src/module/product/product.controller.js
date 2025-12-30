import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import { Product } from "./product.model.js";
import cloudinary from "../../utils/cloudinary.js";
import AppError from "../../error/appError.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, discount, link,productType } = req.body;
  

  if (!req.file) {
    throw new AppError("Please upload an image", status.BAD_REQUEST);
  }

  let imageUrl = "";

  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "products",
        resource_type: "image",
      }
    );
    imageUrl = result.secure_url;
  } catch (cloudinaryError) {
    // console.error('Cloudinary upload error:', cloudinaryError);
    throw new AppError("Image upload failed", status.INTERNAL_SERVER_ERROR);
  }

  const product = await Product.create({
    title,
    price: Number(price),
    description,
    discount: discount ? Number(discount) : 0,
    image: imageUrl,
    link,
    productType
  });

  // console.log("Product created:", product);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product retrieved successfully",
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    throw new AppError("Product id is required", status.BAD_REQUEST);
  }
  const findProduct = await Product.findById(req.params.id);

  if (findProduct.image) {
    const publicId = findProduct.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`products/${publicId}`);
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, price, description, discount, link,productType } = req.body;

  if (!id) {
    throw new AppError("Product id is required", status.BAD_REQUEST);
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new AppError("Product not found", status.NOT_FOUND);
  }

  let imageUrl = product.image;

  if (req.file) {
    try {
      if (product.image) {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

      // Upload new image
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "products",
          resource_type: "image",
        }
      );

      imageUrl = uploadResult.secure_url;
    } catch (err) {
      throw new AppError("Image update failed", status.INTERNAL_SERVER_ERROR);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      price: price ? Number(price) : product.price,
      description,
      discount: discount ? Number(discount) : product.discount,
      image: imageUrl,
      link,
      productType
    },
    { new: true }
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
