import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recipe: {
    type: [String],
    required: true,
  },
  procedure: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  servingSuggestion: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Recipe", RecipeSchema);
