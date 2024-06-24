const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require('../../helpers');
const  auth  = require("../../middlewares/auth");
const getSearchRecipes = require('../../controllers/search/search')

router.get("/", auth, ctrlWrapper(getSearchRecipes));

module.exports = router;
