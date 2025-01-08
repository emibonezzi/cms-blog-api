const getPostById = async (id, db) => {
  return await db.query(`SELECT * FROM posts WHERE post_id = ${id}`);
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

module.exports = { getAllPosts, getPostById, createPost };
