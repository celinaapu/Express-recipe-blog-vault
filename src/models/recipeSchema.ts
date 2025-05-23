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
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
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

RecipeSchema.index({ title: "text", name: "text" });

export default mongoose.model("Recipe", RecipeSchema);
