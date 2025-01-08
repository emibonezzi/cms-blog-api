const postSchema = require("../schemas/post");

module.exports = (body) => {
  return postSchema.validate(body);
};
