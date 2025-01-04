const express = require("express");
const connectToDb = require("./middlewares/connectToDb");
const validateBody = require("./middlewares/validateBody");
const app = express();

// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// get blog posts
app.get("/blog/posts/:id?", connectToDb, async (req, res) => {
  // if post id is passed
  if (req.params.id) {
    const post = await req.dbClient.query(
      `SELECT * FROM posts WHERE post_id=${req.params.id}`
    );
    res.status(200).json(post.rows);
  } else {
    // retrieve ALL posts
    try {
      const posts = await req.dbClient.query("SELECT * FROM posts");
      res.status(200).json(posts.rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error in retrieving posts`, message: error.message });
    }
  }

  await req.dbClient.end();
});

// add new blog post
app.post("/blog/posts", connectToDb, validateBody, async (req, res) => {
  if (req.validationErrorCode) {
    res.status(req.validationErrorCode).json({
      message: req.validationErrorDetails,
    });
  } else {
    // add post to db
    try {
      const post = await req.dbClient.query(
        `INSERT INTO posts (title, body) VALUES ('${req.body.title}', '${req.body.body}') RETURNING *`
      );

      res.status(200).json(post.rows[0]);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Error in saving post", message: error.message });
    }
  }

  await req.dbClient.end();
});

// update post
app.patch("/blog/posts/:id?", connectToDb, validateBody, async (req, res) => {
  // if post id is passed
  if (req.params.id) {
    // look for post to update
    const post = await req.dbClient.query(
      `SELECT * FROM posts WHERE post_id=${req.params.id}`
    );
    if (!post.rows.length === 0) {
      // if post not found
      res.status(400).json({
        error: `Error in updating post`,
        message: "post_id doesn't exist",
      });
    } else {
      if (req.validationErrorCode) {
        res.status(req.validationErrorCode).json({
          message: req.validationErrorDetails,
        });
      } else {
        // update post in db
        try {
          const post = await req.dbClient.query(
            `UPDATE posts SET title = '${req.body.title}', body = '${req.body.body}', modified_at = 'now()' WHERE post_id = ${req.params.id} RETURNING *`
          );

          res.status(200).json(post.rows);
        } catch (error) {
          res
            .status(400)
            .json({ error: "Error in updating post", message: error.message });
        }
      }
    }
  } else {
    res.status(400).json({
      error: `Error in updating post`,
      message: "Please provide a post_id",
    });
  }

  await req.dbClient.end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong", message: err.message });
});

// start web server
app.listen(3000, () => console.log("App listening on port", 3000));
