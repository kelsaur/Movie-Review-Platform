const express = require("express");
const router = express.Router();
const {
	validateRegister,
	validateLogin,
} = require("../middlewares/userValidator");
const { verifyUserCredentials } = require("../middlewares/authMiddleware");
const {
	validateUserUniqueness,
} = require("../middlewares/validateUserUniqueness");
const { registerUser, logIn } = require("../controllers/userController");

router
	.route("/register")
	.post(validateRegister, validateUserUniqueness, registerUser);
router.route("/login").post(validateLogin, verifyUserCredentials, logIn);

module.exports = router;
