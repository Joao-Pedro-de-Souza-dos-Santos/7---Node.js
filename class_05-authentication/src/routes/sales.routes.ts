import { Router } from "express";
import { salesControllers } from "../controllers/salesControllers";
import { authMiddleware } from "../middlewares/authMiddlewares";
import { roleAuthorizationMiddleware } from "../middlewares/roleAuthorizationMiddlewares";

export const salesRoutes = Router();

salesRoutes.use(authMiddleware, roleAuthorizationMiddleware(["admin"]));

salesRoutes.get("/sales", salesControllers.read);