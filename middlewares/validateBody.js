const postSchema = require("../schemas/post");
const MyCustomError = require("../utils/MyCustomError");

module.exports = (req, res, next) => {
  const result = postSchema.validate(req.body);

  try {
    if (result.error) {
      req.validationErrorCode = 400;
      req.validationErrorDetails = result.error.details[0].message;
      throw new MyCustomError(result.error.details[0].message, 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
