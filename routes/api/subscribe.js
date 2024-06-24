const express = require("express");
const router = express.Router();

const  auth  = require("../../middlewares/auth");
const validateBody = require('../../middlewares/validateBody')
const { subscribeUserSchema } = require("../../schemas");
const { ctrlWrapper } = require('../../helpers');
const addSubscribe = require('../../controllers/subscribe/addSubscribe')

router.post("/", auth, validateBody(subscribeUserSchema), ctrlWrapper(addSubscribe));

module.exports = router;
