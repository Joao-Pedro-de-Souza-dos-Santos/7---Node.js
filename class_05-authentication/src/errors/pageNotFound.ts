import { Request, Response, NextFunction } from "express";

export function pageNotFound (req: Request, res: Response, next: NextFunction) {
    const error = new Error("Page Not Found!") as Error & { status: number };
    error.status = 404;
    return next(error)
}