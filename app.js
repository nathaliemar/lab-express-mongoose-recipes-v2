const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    console.log("New recipe created", newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log("Error creating new Recipe", error);
    res.status(500).json({ error: "Failed to create Recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log("Retrieved Recipes", recipes);
    res.status(200).json(recipes);
  } catch (error) {
    console.log("error retrieving recipes", error);
    res.status(500).json({ error: "Failed to retrieve Recipes" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const foundRecipe = await Recipe.findById(recipeId);
    console.log("Recipe retrieved", foundRecipe);
    res.status(200).json(foundRecipe);
  } catch (error) {
    console.log("error retrieving recipe", error);
    res.status(500).json({ error: "Failed to retrieve recipe" });
  }
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });
    console.log("Updated recipe", updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log("Error updating recipe", error);
    res.status(500).json({ error: "Failed to update Recipe" });
  }
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.status(204).send();
  } catch (error) {
    console.log("Error deleting recipe", error);
    res.status(500).json({ error: "Error while deleting recipe" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
