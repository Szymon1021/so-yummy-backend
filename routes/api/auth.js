const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const  auth  = require("../../middlewares/auth");
const validateBody = require('../../middlewares/validateBody')
const {
  userJoiRegisterSchema,
  userJoiLoginSchema,
  userJoiSchemaUpdate,
} = require("../../schemas");
const { uploadCloud } = require("../../middlewares/uploadAvatar");
const  {signup, login, refresh, getCurrentUser, logout, updateUser } = require("../../controllers/auth/authController");

const router = express.Router();

router.post("/signup", validateBody(userJoiRegisterSchema), ctrlWrapper(signup));
router.post("/login", validateBody(userJoiLoginSchema), ctrlWrapper(login));
router.post("/refresh", ctrlWrapper(refresh));
router.get("/current", auth, ctrlWrapper(getCurrentUser));
router.get("/logout", auth, ctrlWrapper(logout));
router.patch(
  "/edit",
  auth,
  uploadCloud,
  validateBody(userJoiSchemaUpdate),
  ctrlWrapper(updateUser)
);



module.exports = router;
