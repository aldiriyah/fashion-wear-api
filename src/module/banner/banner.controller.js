import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import { Banner } from "./banner.model.js";
import cloudinary from "../../utils/cloudinary.js";
import AppError from "../../error/appError.js";

const createBanner = asyncHandler(async (req, res) => {
  const { title, link } = req.body;

  if (!req.files || (!req.files.image && !req.files.video)) {
    throw new AppError("Please upload an image or a video", status.BAD_REQUEST);
  }

  let imageUrl = "";
  let videoUrl = "";

  // Handle Image Upload
  if (req.files.image) {
    const imageFile = req.files.image[0];
    try {
      const result = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
          "base64"
        )}`,
        {
          folder: "banners",
          resource_type: "image",
        }
      );
      imageUrl = result.secure_url;
    } catch (error) {
      throw new AppError("Image upload failed", status.INTERNAL_SERVER_ERROR);
    }
  }

  // Handle Video Upload
  if (req.files.video) {
    const videoFile = req.files.video[0];
    try {
      const result = await cloudinary.uploader.upload(
        `data:${videoFile.mimetype};base64,${videoFile.buffer.toString(
          "base64"
        )}`,
        {
          folder: "banners",
          resource_type: "video",
        }
      );
      videoUrl = result.secure_url;
    } catch (error) {
      console.error("Video upload error:", error);
      throw new AppError("Video upload failed", status.INTERNAL_SERVER_ERROR);
    }
  }

  const banner = await Banner.create({
    title,
    link,
    image: imageUrl,
    video: videoUrl,
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Banner created successfully",
    data: banner,
  });
});

const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Banners retrieved successfully",
    data: banners,
  });
});

const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);

  if (!banner) {
    throw new AppError("Banner not found", status.NOT_FOUND);
  }

  if (banner.image) {
    const publicId = banner.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`banners/${publicId}`);
  }

  if (banner.video) {
    // Cloudinary video deletion usually requires specifying resource_type: 'video'
    const publicId = banner.video.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`banners/${publicId}`, {
      resource_type: "video",
    });
  }

  await Banner.findByIdAndDelete(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Banner deleted successfully",
  });
});

export const bannerController = {
  createBanner,
  getAllBanners,
  deleteBanner,
};
