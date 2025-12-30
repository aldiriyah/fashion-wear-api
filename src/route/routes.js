import { Router } from "express";
import { userRouter } from "../module/user/user.route.js";
import { authRouter } from "../module/auth/auth.router.js";
import { productRouter } from "../module/product/product.route.js";
import { contactRouter } from "../module/contact/contact.router.js";
import { featuresRouter } from "../module/features/features.route.js";

const router = Router();

const moduleRouter = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/product",
    router: productRouter,
  },
  {
    path: "/contact",
    router: contactRouter,
  },
  {
    path: "/features",
    router: featuresRouter,
  },
];

moduleRouter.forEach((item) => {
  router.use(item.path, item.router);
});

export default router;
