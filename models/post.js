const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
});

module.exports = postSchema;
