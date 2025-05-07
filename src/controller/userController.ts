import { NextFunction, Request, Response } from "express";
import User from "../models/userSchema";

// const router = express.Router();
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = new User(req.body);

  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    next(err);
  }
};

//update a User post
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

//delete a User post
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(" this user has successfully deleted their acc");
  } catch (err) {
    next(err);
  }
};

//get a particular User post
export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//get all User posts
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
