const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const isAuthenticatedUser = require("../middleware/authMiddleware");

module.exports = router.post("/create", isAuthenticatedUser , commentController.createComment);