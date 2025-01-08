const postService = require("../services/postService");
const MyCustomError = require("../utils/MyCustomError");
const pool = require("../db/index");

exports.getAllPosts = async (req, res, next) => {
  const db = await pool.connect();
  try {
    const posts = await postService.getAllPosts(db);
    res.status(200).json(posts.rows);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  } finally {
    db.release();
  }
};

exports.getPost = async (req, res, next) => {
  const db = await pool.connect();
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id, db);
    res.status(200).json(post.rows);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  } finally {
    db.release();
  }
};
