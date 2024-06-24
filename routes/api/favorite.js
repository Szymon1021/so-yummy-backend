const express = require("express");

const  auth  = require("../../middlewares/auth");
const { ctrlWrapper } = require('../../helpers');
const addFavorite = require('../../controllers/favorite/addFavorite')
const deleteFavorite = require('../../controllers/favorite/deleteFavorite')
const getFavoriteById = require('../../controllers/favorite/getFavoriteById')
const getFavorites = require('../../controllers/favorite/getFavorites')

const router = express.Router();

router.get("/", auth, ctrlWrapper(getFavorites));

router.get("/:recipeId", auth, ctrlWrapper(getFavoriteById));

router.post("/:recipeId", auth, ctrlWrapper(addFavorite));

router.delete("/:recipeId", auth, ctrlWrapper(deleteFavorite));

module.exports = router;
