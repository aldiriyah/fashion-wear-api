import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import { Navbar } from "./navbar.model.js";

const createNavbar = asyncHandler(async (req, res) => {
  const result = await Navbar.create(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Navbar created successfully",
    data: result,
  });
});

const getNavbar = asyncHandler(async (req, res) => {
  const result = await Navbar.find();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Navbar fetched successfully",
    data: result,
  });
});

const getNavbarById = asyncHandler(async (req, res) => {
  const result = await Navbar.findById(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Navbar fetched successfully",
    data: result,
  });
});

const deleteNavbar = asyncHandler(async (req, res) => {
  const result = await Navbar.findByIdAndDelete(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Navbar deleted successfully",
    data: result,
  });
});

const updateNavbar = asyncHandler(async (req, res) => {
  const result = await Navbar.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Navbar updated successfully",
    data: result,
  });
});

export const navbarController = {
  createNavbar,
  getNavbar,
  getNavbarById,
  deleteNavbar,
  updateNavbar,
};
