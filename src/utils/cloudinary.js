import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Log the values to debug (remove in production)
// console.log("Cloudinary Config:", {
//   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//   apiKey: process.env.CLOUDINARY_API_KEY ? "API Key exists" : "API Key missing",
//   apiSecret: process.env.CLOUDINARY_API_SECRET
//     ? "API Secret exists"
//     : "API Secret missing",
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export default cloudinary;
