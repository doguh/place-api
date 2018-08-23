const Joi = require("joi");

module.exports = {
  post: Joi.object().keys({
    x: Joi.number()
      .integer()
      .required(),
    y: Joi.number()
      .integer()
      .required(),
    color: Joi.number()
      .integer()
      .required()
  })
};
