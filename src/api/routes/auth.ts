import {
  register,
  login,
  checkAuth,
  signout,
} from "../../controller/authController";
import express from "express";
import { verifyToken } from "../../utils/vorifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/signout", signout);
router.get("/checkauth", verifyToken, checkAuth);

export default router;
