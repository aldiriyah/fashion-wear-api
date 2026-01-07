import { Router } from "express";
import { navbarController } from "./navbar.controller.js";
const router = Router();

router.post("/", navbarController.createNavbar);
router.get("/", navbarController.getNavbar);
router.get("/:id", navbarController.getNavbarById);
router.delete("/:id", navbarController.deleteNavbar);
router.put("/:id", navbarController.updateNavbar);

export const navbarRoute = router;
