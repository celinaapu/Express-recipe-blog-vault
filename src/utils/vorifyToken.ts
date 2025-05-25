import jwt from "jsonwebtoken";
import { createError } from "./error";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.isAuthenticated = false;

  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "you are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT_SECRET_TOKEN!, (err: any, user: any) => {
    console.log("🔍 JWT Token payload:", { user, err });
    console.log("🔍 User ID from token:", user?.id);
    console.log(
      "🔍 Full user object from token:",
      JSON.stringify(user, null, 2)
    );

    if (err) return next(createError(403, "Invalid Token!"));
    req.user = user;
    req.isAuthenticated = true;
    next();
  });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id) {
      next();
    } else {
      return next(createError(403, "you are not authorized"));
    }
  });
};
