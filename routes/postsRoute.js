const express = require("express");
const searchPostId = require("../utils/searchPostId");
const MyCustomError = require("../utils/MyCustomError");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);

/* router.patch("/:id?", validateBody, async (req, res, next) => {
  // if post id is passed
  if (req.params.id) {
    // look for post to update
    const post = await searchPostId(req.params.id, req.dbClient);
    if (post.rows.length === 0) {
      // if post not found
      next(new MyCustomError("Post id doesn't exist", 400));
    } else {
      // update post in db
      try {
        const post = await req.dbClient.query(
          `UPDATE posts SET title = '${req.body.title}', body = '${req.body.body}', modified_at = 'now()' WHERE post_id = ${req.params.id} RETURNING *`
        );

        res.status(200).json(post.rows);
      } catch (error) {
        next(new MyCustomError(error.message, 500));
      }
    }
  } else {
    next(new MyCustomError("Please provide a post_id", 400));
  }

  await req.dbClient.end();
}); */

router.delete("/:id?", async (req, res, next) => {
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
});

const postsRoute = router;
module.exports = postsRoute;
