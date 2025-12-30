import { Router } from "express";
import { contactController } from "./contact.controller.js";

const router = Router();

router.post("/", contactController.postContact);
router.get("/", contactController.getAllContact);
router.delete("/:id", contactController.deleteContact);
router.get("/stats", contactController.getContactStats);

export const contactRouter = router;
