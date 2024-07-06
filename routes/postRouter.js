const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const isAuthenticatedUser = require("../middleware/authMiddleware");

module.exports = router.post("/create", isAuthenticatedUser , postController.createPost)
.get("/",postController.getAllPosts);