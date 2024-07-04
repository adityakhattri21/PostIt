const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

module.exports = router.post("/signup",authController.signupUser)
.post("/login",authController.login)
.post('/logout',authController.logout)
.get("/all-details",authController.getDetails)

