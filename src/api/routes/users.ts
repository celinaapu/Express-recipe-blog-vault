import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../../controller/userController";
import { verifyToken, verifyUser } from "../../utils/vorifyToken";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getOneUser);

router.get("/", verifyUser, getAllUser);

router.get("/my-profile", verifyUser, getCurrentUserProfile);

router.put("/edit-my-profile", verifyUser, updateCurrentUserProfile);

export default router;
