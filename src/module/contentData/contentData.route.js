import express from "express";
import { getContent, updateContent } from "./contentData.controller.js";

const router = express.Router();

router.get("/:slug", getContent);
router.post("/:slug", updateContent);

export default router;
