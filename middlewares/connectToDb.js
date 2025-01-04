const { Client } = require("pg");
const MyCustomError = require("../utils/MyCustomError");
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
    req.dbClient = client;
    await client.connect();
    next();
  } catch (error) {
    next(new MyCustomError(error.message, 500));
  }
};
