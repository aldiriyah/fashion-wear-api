import { Router } from "express";
import { productController } from "./product.controller.js";
import upload from "../../middleware/uploadMiddleware.js";

const router = Router();

router.post("/create", upload.single("image"), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);

export const productRouter = router;
