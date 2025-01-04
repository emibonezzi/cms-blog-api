const postSchema = require("../schemas/post");

module.exports = (req, res, next) => {
  const result = postSchema.validate(req.body);

  if (result.error) {
    req.validationErrorCode = 400;
    req.validationErrorDetails = result.error.details[0].message;
  }

  next();
};
