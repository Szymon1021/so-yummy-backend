const express = require("express");
const { ctrlWrapper } = require('../../helpers');
const { uploadCloud } = require("../../middlewares/uploadCloudinary");
const  auth  = require("../../middlewares/auth");
const getOwnRecipes = require("../../controllers/ownrecipes/getOwnRecipes");
const getOwnRecipeById = require("../../controllers/ownrecipes/getOwnRecipeById");
const addOwnRecipe = require("../../controllers/ownrecipes/addOwnRecipe");
const deleteOwnRecipe = require("../../controllers/ownrecipes/deleteOwnRecipe");
const router = express.Router();

router.get("/", auth, ctrlWrapper(getOwnRecipes));

router.get("/:recipeId", auth, ctrlWrapper(getOwnRecipeById));

router.post("/", auth, uploadCloud, ctrlWrapper(addOwnRecipe));

router.delete("/:recipeId", auth, ctrlWrapper(deleteOwnRecipe));

module.exports = router;
