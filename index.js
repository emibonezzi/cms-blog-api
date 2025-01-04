const express = require("express");
const postSchema = require("./schemas/post");
const connectToDb = require("./handlers/connectToDb");
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
});

// add new blog post
app.post("/blog/posts", connectToDb, async (req, res) => {
  // validate post
  const result = postSchema.validate(req.body);

  if (result.error) {
    res.status(500).json({
      error: "Post not valid",
      message: result.error.details[0].message,
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
});

// update post
app.patch("/blog/posts/:id", connectToDb, async (req, res) => {});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong", message: err.message });
});

// start web server
app.listen(3000, () => console.log("App listening on port", 3000));
