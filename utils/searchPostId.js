module.exports = async (id, dbClient) => {
  return await dbClient.query(`SELECT * FROM posts WHERE post_id = ${id}`);
};
