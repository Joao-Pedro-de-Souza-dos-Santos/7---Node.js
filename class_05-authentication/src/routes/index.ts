import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { salesRoutes } from "./sales.routes";

export const routes = Router();

routes.use(authRoutes);
routes.use(salesRoutes);
routes.use(userRoutes);
