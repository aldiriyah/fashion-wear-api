import AppError from "../../error/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";
import sendResponse from "../../utils/sendResponse.js";
import status from "http-status";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new AppError("User not found", status.NOT_FOUND);
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new AppError("Password does not match", status.UNAUTHORIZED);
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  sendResponse(res, {
    statuscode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
    },
  });
});
