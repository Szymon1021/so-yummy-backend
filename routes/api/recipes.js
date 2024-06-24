const express = require("express");
const router = express.Router();
const isValidId  = require("../../middlewares/isValid");
const  auth  = require("../../middlewares/auth");
const { ctrlWrapper } = require('../../helpers');
const getCategoriesList  = require('../../controllers/recipes/getCategoriesList')
const getRecipeById = require('../../controllers/recipes/getRecipeById')
const getRecipesByCategory = require('../../controllers/recipes/getRecipesByCategory')
const getRecipesByFourCategories = require('../../controllers/recipes/getRecipesByFourCategories')


router.get("/", auth, getRecipesByFourCategories);

router.get("/category-list", auth, ctrlWrapper(getCategoriesList));

router.get("/:recipeId", auth, isValidId, ctrlWrapper(getRecipeById));

router.get("/categories/:categoryName", auth, ctrlWrapper(getRecipesByCategory));

module.exports = router;
