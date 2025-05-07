import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  getOneRecipe,
  updateRecipe,
} from "../../controller/recipeContrlller";
import { verifyToken } from "../../utils/vorifyToken";

const router = express.Router();

router.post("/", verifyToken, createRecipe);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

router.get("/:id", getOneRecipe);

router.get("/", getAllRecipe);

export default router;
