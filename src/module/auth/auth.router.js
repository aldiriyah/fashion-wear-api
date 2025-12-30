import { Router } from "express";

const router = Router();
import { loginUser } from "./auth.controller.js";

router.post("/login", loginUser);

export const authRouter = router;
