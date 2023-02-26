const express = require("express");

const authRoutes = express.Router();

const { signup, login } = require("../controllers/userController");

authRoutes.post(
  "/signup",
  // useSignUpValidationRules(),
  // userSignupSanitizers(),
  // validateUserSignUp,
  signup
);

authRoutes.post(
  "/login",
  // userLoginSanitizers(),
  login
);

module.exports = authRoutes;
