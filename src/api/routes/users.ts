import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../../controller/userController";
import { verifyAdmin, verifyToken, verifyUser } from "../../utils/vorifyToken";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("this user is logged in ");
// });

// router.get("/checkuser", verifyUser, (req, res, next) => {
//   res.send("hello user, you can successfully delete your acc  ");
// });

// router.get("/checkAdmin", verifyAdmin, (req, res, next) => {
//   res.send("hello Admin, you can successfully delete all acc  ");
// });

// router.post("/", verifyUser, createUser);

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getOneUser);

router.get("/", verifyAdmin, getAllUser);

export default router;
