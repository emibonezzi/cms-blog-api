const express = require("express");
const searchPostId = require("../utils/searchPostId");
const MyCustomError = require("../utils/MyCustomError");
const validateBody = require("../middlewares/validateBody");
const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  // if post id is passed
  if (req.params.id) {
    const post = await searchPostId(req.params.id, req.dbClient);
    res.status(200).json(post.rows);
  } else {
    // retrieve ALL posts
    try {
      const posts = await req.dbClient.query("SELECT * FROM posts");
      res.status(200).json(posts.rows);
    } catch (error) {
      next(new MyCustomError(error.message, 500));
    }
  }

  await req.dbClient.end();
});

router.post("/", validateBody, async (req, res, next) => {
  // add post to db
  try {
    const post = await req.dbClient.query(
      `INSERT INTO posts (title, body) VALUES ('${req.body.title}', '${req.body.body}') RETURNING *`
    );

    res.status(200).json(post.rows[0]);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  }

  await req.dbClient.end();
});

router.patch("/:id?", validateBody, async (req, res, next) => {
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
});

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

module.exports = router;
