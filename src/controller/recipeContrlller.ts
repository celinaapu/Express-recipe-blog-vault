import { NextFunction, Request, Response } from "express";
import Recipe from "../models/recipeSchema";

// const router = express.Router();
export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newRecipe = new Recipe(req.body);

  try {
    const saveRecipe = await newRecipe.save();
    res.status(200).json(saveRecipe);
  } catch (err) {
    next(err);
  }
};

//update a recipe post
export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

//delete a recipe post
export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json(" Your recipe post was deleted");
  } catch (err) {
    next(err);
  }
};

//get a particular recipe post
export const getOneRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

//get all recipe posts
export const getAllRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};
