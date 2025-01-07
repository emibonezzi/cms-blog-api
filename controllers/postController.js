const postService = require("../services/postService");
const MyCustomError = require("../utils/MyCustomError");

exports.getAll = async (req, res, next) => {
  // retrieve ALL posts
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts.rows);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  }

  await req.dbClient.end();
};

exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.body;
    const post = await postService.searchById(id);
    res.status(200).json(post.rows);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  }
};
