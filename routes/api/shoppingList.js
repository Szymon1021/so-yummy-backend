const express = require("express");
const router = express.Router();

const  auth  = require("../../middlewares/auth");
const validateBody = require('../../middlewares/validateBody')
const { addShoppingListSchema } = require("../../schemas");
const { ctrlWrapper } = require('../../helpers');
const getShoppingList = require('../../controllers/shoppingList/getShoppingList')
const deleteShoppingList = require('../../controllers/shoppingList/deleteShoppingList')
const addShoppingList = require('../../controllers/shoppingList/addShoppingList')
router.get("/", auth, ctrlWrapper(getShoppingList));

router.post(
  "/",
  auth,
  validateBody(addShoppingListSchema),
  ctrlWrapper(addShoppingList)
);

router.delete("/:id", auth, ctrlWrapper(deleteShoppingList));

module.exports = router;
