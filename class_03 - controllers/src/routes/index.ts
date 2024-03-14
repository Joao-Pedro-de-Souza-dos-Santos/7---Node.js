import { Router } from "express";
import { userControllers } from "../controllers/userControlllers";

export const router = Router();

router.post("/user", userControllers.create);
router.get("/user/:id", userControllers.read);