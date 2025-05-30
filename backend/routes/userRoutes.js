import express from "express";
import {
	validateRegister,
	validateLogin,
} from "../middlewares/userValidator.js";
import { verifyUserCredentials } from "../middlewares/authMiddleware.js";
import { validateUserUniqueness } from "../middlewares/validateUserUniqueness.js";
import { registerUser, logIn } from "../controllers/userController.js";

const router = express.Router();

router
	.route("/register")
	.post(validateRegister, validateUserUniqueness, registerUser);
router.route("/login").post(validateLogin, verifyUserCredentials, logIn);

export default router;
