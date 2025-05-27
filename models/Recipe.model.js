const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SCHEMA
const RecipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  instructions: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, default: 0 },
  isArchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});
//MODEL
const Recipe = mongoose.model("Recipe", RecipeSchema);

//EXPORT
module.exports = Recipe;
