import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import { StripePay } from "./stripePay.model.js";

const createStripePay = asyncHandler(async (req, res) => {
  const result = await StripePay.create(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Stripe Pay created successfully",
    data: result,
  });
});

const getStripePay = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalCount = await StripePay.countDocuments();
  const result = await StripePay.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Stripe Pay fetched successfully",
    data: {
      payments: result,
      totalCount: totalCount,
    },
  });
});

const getStripePayById = asyncHandler(async (req, res) => {
  const result = await StripePay.findById(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Stripe Pay fetched successfully",
    data: result,
  });
});

const deleteStripePay = asyncHandler(async (req, res) => {
  const result = await StripePay.findByIdAndDelete(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Stripe Pay deleted successfully",
    data: result,
  });
});

const updateStripePay = asyncHandler(async (req, res) => {
  const result = await StripePay.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Stripe Pay updated successfully",
    data: result,
  });
});

export const stripePayController = {
  createStripePay,
  getStripePay,
  getStripePayById,
  deleteStripePay,
  updateStripePay,
};
