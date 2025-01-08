const express = require("express");
const searchPostId = require("../utils/searchPostId");
const MyCustomError = require("../utils/MyCustomError");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
router.patch("/:id?", postController.updatePost);

/* router.delete("/:id?", async (req, res, next) => {
  if (req.params.id) {
    const post = await searchPostId(req.params.id, req.dbClient);
    if (post.rows.length === 0) {
      next(new MyCustomError("Post id doesn't exist", 400));
    } else {
      const post = await req.dbClient.query(
        `DELETE FROM posts WHERE post_id = ${req.params.id} RETURNING *`
      );
      res.status(200).json({ status: "deleted", post: post.rows });
    }
  } else {
    next(new MyCustomError("Please provide a post id", 400));
  }

  await req.dbClient.end();
}); */

const postsRoute = router;
module.exports = postsRoute;
