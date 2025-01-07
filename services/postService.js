const searchById = async (id) => {
  return await req.dbClient.query(`SELECT * FROM posts WHERE post_id = ${id}`);
};

const getAllPosts = async () => {
  return await req.dbClient.query("SELECT * FROM posts");
};

module.exports = { getAllPosts, searchById };
