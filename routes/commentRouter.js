const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = router.post("/create", authMiddleware.isAuthenticatedUser , commentController.createComment);