import { Router } from "express";
import { bannerController } from "./banner.controller.js";
import upload from "../../middleware/uploadMiddleware.js";

const router = Router();

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  bannerController.createBanner
);

router.get("/", bannerController.getAllBanners);

router.delete("/:id", bannerController.deleteBanner);

export const bannerRouter = router;
