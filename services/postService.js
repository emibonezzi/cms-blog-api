const getPostById = async (id, db) => {
  return await db.query(`SELECT * FROM posts WHERE post_id = ${id}`);
};

const getAllPosts = async (db) => {
  return await db.query("SELECT * FROM posts");
};

module.exports = { getAllPosts, getPostById };
