import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

type AppError = {
  status: number;
  message: string;
};

export function appErrors(
  error: AppError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("XXXXXXXXXX Middlewares Errors XXXXXXXXXXXX -", error);

  if (error instanceof ZodError) {
    return res.status(error.status || 500).json({
      message: JSON.parse(error.message)[0].message || "Server Error",
    });
  }

  return res
    .status(error.status || 500)
    .json({ message: error.message || "Server Error" });
}
