import { Router } from "express";
import { stripePayController } from "./stripePay.controller.js";
const router = Router();

router.post("/init", stripePayController.createStripePay);
router.get("/", stripePayController.getStripePay);
router.get("/:id", stripePayController.getStripePayById);
router.delete("/:id", stripePayController.deleteStripePay);
router.put("/:id", stripePayController.updateStripePay);

export const stripePayRoute = router;
