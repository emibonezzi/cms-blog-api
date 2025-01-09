const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
router.patch("/:id?", postController.updatePost);
router.delete("/:id?", postController.deletePost);

const postsRoute = router;
module.exports = postsRoute;
