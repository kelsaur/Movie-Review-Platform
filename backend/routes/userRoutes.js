import express from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validation/userValidator.js";
import { verifyUserCredentials } from "../middlewares/authMiddleware.js";
import { validateUserUniqueness } from "../middlewares/validateUserUniqueness.js";
import { registerUser, logIn } from "../controllers/userController.js";

const router = express.Router();

router
	.route("/register")
	.post(validate(registerSchema), validateUserUniqueness, registerUser);
router
	.route("/login")
	.post(validate(loginSchema), verifyUserCredentials, logIn);

export default router;
