import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import { User } from "./user.model.js";
import AppError from "../../error/appError.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", status.BAD_REQUEST);
  }
  const result = await User.create({ name, email, password, role });
  sendResponse(res, {
    statuscode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const result = await User.find();
  sendResponse(res, {
    statuscode: status.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const result = await User.findById(req.params.id);
  sendResponse(res, {
    statuscode: status.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    throw new AppError("User not found", status.NOT_FOUND);
  }
  const result = await User.findByIdAndDelete(req.params.id);
  sendResponse(res, {
    statuscode: status.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  sendResponse(res, {
    statuscode: status.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
};
