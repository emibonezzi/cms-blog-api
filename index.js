const express = require("express");
const postsRoute = require("./routes/postsRoute");
const app = express();

// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/blog/posts", postsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ error: err.message });
});

// start web server
app.listen(3000, () => console.log("App listening on port", 3000));
