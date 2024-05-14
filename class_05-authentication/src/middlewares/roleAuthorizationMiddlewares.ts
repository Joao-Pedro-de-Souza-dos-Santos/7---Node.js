import { Request, Response, NextFunction } from "express";
import { userRepositorie } from "../repositories/userRepositories";

type Roles = "admin" | "default";

export function roleAuthorizationMiddleware (role: Roles[]) {
 return async (req: Request, res: Response, next:NextFunction) => {
    try {
        const user = await userRepositorie.getById(req.userID);

        if (!role.includes(user.role)) throw res.status(401).json({ message: "Usuário não Autorizado!" });

        return next();
    } catch (error) {
        return next(error);
    }
 }
}