const express = require("express");
const client = require("./handlers/dbClient");
const app = express();

// get blog posts
app.get("/api/get-posts", async (req, res) => {
  // connect to db
  try {
    await client.connect();
  } catch (error) {
    res.status(500).send(`Error in connecting to db:${error.message}`);
  }

  // retrieve posts
  try {
    const posts = await client.query("SELECT * FROM posts");
    res.status(200).json(posts.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error in retrieving posts`, message: error.message });
  }
});

// start web server
app.listen(3000, () => console.log("App listening on port", 3000));
