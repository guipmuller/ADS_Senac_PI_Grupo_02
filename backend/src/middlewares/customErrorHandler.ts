import { ValidateError } from "tsoa";
import { Request, Response, NextFunction } from "express";

export function customErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    const formatted = Object.entries(err.fields).map(([field, error]) => ({
      field,
      message: error.message,
    }));

    return res.status(422).json({
      message: "Validation error.",
      errors: formatted,
    });
  }

  next(err);
}