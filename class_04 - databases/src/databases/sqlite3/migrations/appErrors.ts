//retorna mensagem de erro se caso ocorrer
import { NextFunction, Request, Response} from "express";

type AppError = {
    status: number;
    message: string;
}

export function appErrors(error: AppError, _req: Request, res: Response,  next: NextFunction) {
    console.error("Middlewares Errors -", error);
    res.status(error.status || 500).json({ message: error.message || "Server Error"});
    next(error);
}