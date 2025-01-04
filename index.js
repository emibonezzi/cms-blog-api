const express = require("express");
const postSchema = require("./schemas/post");
const connectToDb = require("./handlers/connectToDb");
const app = express();

// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// get blog posts
app.get("/api/get-posts", connectToDb, async (req, res) => {
  // retrieve posts
  try {
    const posts = await client.query("SELECT * FROM posts");
    res.status(200).json(posts.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error in retrieving posts`, message: error.message });
  }

  // close connection with db
  await client.end();
});

// add new blog post
app.post("/api/new-post", connectToDb, async (req, res) => {
  // validate post
  const result = postSchema.validate(req.body);
  if (result.error) {
    res
      .status(500)
      .json({
        error: "Post not valid",
        message: result.error.details[0].message,
      });
  } else {
    res.status(200).json(req.body);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong", message: err.message });
});

// start web server
app.listen(3000, () => console.log("App listening on port", 3000));
