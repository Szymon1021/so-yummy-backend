const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const  auth  = require("../../middlewares/auth");
const getPopularRecipes = require('../../controllers/popularRecipes/getPopularRecipes')

const router = express.Router();

router.get('/', auth, ctrlWrapper(getPopularRecipes));

module.exports = router;
