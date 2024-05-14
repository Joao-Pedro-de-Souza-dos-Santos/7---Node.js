import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/authMiddlewares";

export const userRoutes = Router();

userRoutes.post("/user", userControllers.create);
userRoutes.get("/user", authMiddleware, userControllers.read);
// userRoutes.put("/user", userControllers.update);
// userRoutes.delete("/user", userControllers.delete);