const getPostById = async (id, db) => {
  const post = await db.query(`SELECT * FROM posts WHERE post_id = ${id}`);
  return post.rows; //
};

const getAllPosts = async (db) => {
  return await db.query("SELECT * FROM posts");
};

const createPost = async (body, db) => {
  const newPost = await db.query(
    `INSERT INTO posts (title, body) VALUES ('${body.title}', '${body.body}') RETURNING *`
  );
  return newPost.rows[0];
};

const updatePost = async (body, id, db) => {
  const updatedPost = await db.query(
    `UPDATE posts SET title = '${body.title}', body = '${body.body}', modified_at = 'now()' WHERE post_id = ${id} RETURNING *`
  );
  return updatedPost.rows[0];
};

module.exports = { getAllPosts, getPostById, createPost, updatePost };
