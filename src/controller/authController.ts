import { NextFunction, Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      gender: req.body.gender,
    });

    await newUser.save();
    return res.status(200).send("Welcome to the family as a new user");
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    console.log(user);
    //comparing passwords
    const isPasswordCorrect = bcrypt.compare(req.body.password, user?.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "failed",
        message: "Password is incorrect",
      });
    }

    const genToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_TOKEN!,
      {
        expiresIn: "1W",
      }
    );
    const { password, isAdmin, ...otherDetails } = user;

    return res
      .cookie("access_token", genToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    //  isLoggedIn: true, user: req.user
    isLoggedIn: req.isAuthenticated,
    user: req.user,
  });
};

export const signout = async (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Signed out successfully" });
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "user is authorized to manage this account",
    user: req.user,
  });
};
