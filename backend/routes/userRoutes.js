const express = require("express");
const router = express.Router();
const { registerUser, logIn } = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(logIn);

module.exports = router;
