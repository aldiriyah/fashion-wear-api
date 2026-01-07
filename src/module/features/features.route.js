import { Router } from "express";
import { featuresController } from "./features.controller.js";
import upload from "../../middleware/uploadMiddleware.js";

const router = Router();

router.post(
  "/create-footer",
  upload.single("logo"),
  featuresController.createAndUpdateFooter
);
// router.post(
//   "/create-banner",
//   upload.array("image", 3),
//   featuresController.createBannerAndUpdate
// );
// router.get("/find-banner", featuresController.findBanner);
router.get("/get-footer", featuresController.findFooter);

export const featuresRouter = router;
