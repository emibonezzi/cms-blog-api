const postService = require("../services/postService");
const MyCustomError = require("../utils/MyCustomError");
const pool = require("../db/index");
const validateBody = require("../utils/validateBody");

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
  const { id } = req.params;

  try {
    const post = await postService.getPostById(id, db);
    res.status(200).json(post);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  } finally {
    db.release();
  }
};

exports.createPost = async (req, res, next) => {
  const db = await pool.connect();
  const validate = validateBody(req.body);

  if (validate.error) {
    next(new MyCustomError(validate.error.message, 400));
    return;
  }

  try {
    const newPost = await postService.createPost(req.body, db);
    res.status(201).json(newPost);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  } finally {
    db.release();
  }
};

exports.updatePost = async (req, res, next) => {
  const db = await pool.connect();
  const validate = validateBody(req.body);
  const { id } = req.params;

  if (!id) return next(new MyCustomError("Please provide post id", 400));

  const postToUpdate = await postService.getPostById(id, db);

  if (postToUpdate.length === 0) {
    next(new MyCustomError("Post doesn't exist", 400));
    return;
  }

  try {
    if (validate.error) {
      next(new MyCustomError(validate.error.message, 400));
      return;
    }

    const updatedPost = await postService.updatePost(req.body, id, db);
    res.status(200).json(updatedPost);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  } finally {
    db.release();
  }
};

exports.deletePost = async (req, res, next) => {
  const db = await pool.connect();
  const { id } = req.params;

  if (!id) return next(new MyCustomError("Please provide post id", 400));

  const postToUpdate = await postService.getPostById(id, db);

  if (postToUpdate.length === 0) {
    next(new MyCustomError("Post doesn't exist", 400));
    return;
  }

  try {
    const deletedPost = await postService.deletePost(id, db);
    res.status(200).json(deletedPost);
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  } finally {
    db.release();
  }
};
