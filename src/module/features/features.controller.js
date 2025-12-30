import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../error/appError.js";
import cloudinary from "../../utils/cloudinary.js";
import status from "http-status";
import { Banner, Footer } from "./features.model.js";

const createAndUpdateFooter = asyncHandler(async (req, res) => {
  const { title } = req.body;
  

  const footerData = {
    title: title || "Smartwear Outfits",
    companyInfo: {
      address: req.body.address,
      companyRegistrationNumber: req.body.companyRegistrationNumber,
      vatRegistrationNumber: req.body.vatRegistrationNumber,
    },
    categories: JSON.parse(req.body.categories || '[]'),
    informationLinks: JSON.parse(req.body.informationLinks || '[]'),
    contactInfo: {
      email: req.body.email,
      phoneNumbers: JSON.parse(req.body.phoneNumbers || '[]'),
    },
    socialMedia: JSON.parse(req.body.socialMedia || '[]'),
    copyright: req.body.copyright,
  };

  let logo = footerData.companyInfo.logo;

  
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "footer",
          resource_type: "image",
        }
      );
      logo = result.secure_url;
    } catch (cloudinaryError) {
      throw new AppError("Image upload failed", status.INTERNAL_SERVER_ERROR);
    }
  }


  footerData.companyInfo.logo = logo;

  const existingFooter = await Footer.findOne({ title: footerData.title });
  
  let result;
  if (existingFooter) {
    
    result = await Footer.findOneAndUpdate(
      { title: footerData.title },
      footerData,
      { new: true, runValidators: true }
    );
  } else {
    
    result = await Footer.create(footerData);
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: existingFooter ? "Footer updated successfully" : "Footer created successfully",
    data: result,
  });
});

const createBannerAndUpdate = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError("Please upload at least one image", status.BAD_REQUEST);
  }

  const existingBanner = await Banner.findOne({ title: "Smartwear Outfits" });

  const bannerUrls = [];
  for (const file of req.files) {
    try {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "banner",
          resource_type: "image",
        }
      );
      bannerUrls.push(result.secure_url);
    } catch {
      throw new AppError("Image upload failed", status.INTERNAL_SERVER_ERROR);
    }
  }

  let banner;

  if (existingBanner) {
    // ✅ Append new images to the existing array
    banner = await Banner.findOneAndUpdate(
      { title: "Smartwear Outfits" },
      { $push: { image: { $each: bannerUrls } } },
      { new: true }
    );
  } else {
    // ✅ Create new banner
    banner = await Banner.create({
      title: "Smartwear Outfits",
      image: bannerUrls,
    });
  }

  res.status(status.CREATED).json({
    success: true,
    message: existingBanner
      ? "Banner updated successfully"
      : "Banner created successfully",
    data: banner,
  });
});


const findBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findOne({ title: "Smartwear Outfits" });
  if (!banner) {
    throw new AppError(
      `Banner with title "${title}" not found.`,
      status.NOT_FOUND
    );
  }
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Banner found successfully",
    data: banner,
  });
});

const findFooter = asyncHandler(async (req, res) => {
  const  title  =  "Smartwear Outfits" 
  const footer = await Footer.findOne({ title: title });
  if (!footer) {
    throw new AppError(
      `Footer with title "${title}" not found.`,
      status.NOT_FOUND
    );
  }
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Footer found successfully",
    data: footer,
  });
});
export const featuresController = {
  createAndUpdateFooter,
  createBannerAndUpdate,
  findBanner,
  findFooter,
};
