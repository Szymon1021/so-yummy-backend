const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require('../../helpers');
const  auth  = require("../../middlewares/auth");
const getIngredients = require('../../controllers/ingredients/getIngredients')
const getIngredientsList = require('../../controllers/ingredients/getIngredientsList')



router.get("/list", auth, ctrlWrapper(getIngredientsList));

router.get("/:query", auth, ctrlWrapper(getIngredients));

module.exports = router;
