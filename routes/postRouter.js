const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = router.post("/create", authMiddleware.isAuthenticatedUser  , postController.createPost)
.get("/",postController.getAllPosts);