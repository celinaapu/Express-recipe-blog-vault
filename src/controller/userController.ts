import { NextFunction, Request, Response } from "express";
import User from "../models/userSchema";

interface AuthenticatedRequest extends Request {
  User?: {
    id: string;
    [key: string]: any;
  };
}

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

export const getCurrentUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not autjenticated" });
    }
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = {
      ...user.toObject(),
      id: user._id,
      username: user.username,
      email: user.email,
    };
    res.status(200).json(userProfile);
  } catch (err) {
    next(err);
  }
};

// Update current authenticated user's profile
export const updateCurrentUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const allowedUpdates = ["name", "bio", "profileImage", "socialhandle"];
    const updates: Record<string, any> = {};

    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
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

//get a particular User
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

//get all User
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
