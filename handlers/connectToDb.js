const { Client } = require("pg");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  // connect to db
  try {
    await client.connect();
    next();
  } catch (error) {
    next(error);
  }
};
