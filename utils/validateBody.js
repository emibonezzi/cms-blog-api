const postSchema = require("../models/post");

module.exports = (body) => {
  return postSchema.validate(body);
};
