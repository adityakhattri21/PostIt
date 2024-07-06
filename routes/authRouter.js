const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = router.post("/signup",authController.signupUser)
.post("/login",authController.login)
.post('/logout',authController.logout)
.get("/all-details",authMiddleware.isAuthenticatedUser , authController.getDetails);

