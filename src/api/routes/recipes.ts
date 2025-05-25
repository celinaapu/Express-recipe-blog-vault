import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  getOneRecipe,
  updateRecipe,
  getAllAuthorsRecipe,
  getSearchedRecipes,
} from "../../controller/recipeController";
import { verifyToken, verifyUser } from "../../utils/vorifyToken";

const router = express.Router();

router.post("/", verifyToken, createRecipe);

router.put("/:id", verifyUser, updateRecipe);

router.delete("/:id", verifyUser, deleteRecipe);

router.get("/:id", getOneRecipe);

router.get("/", getSearchedRecipes);

router.get("/user/my-recipes", verifyToken, getAllAuthorsRecipe);

export default router;
