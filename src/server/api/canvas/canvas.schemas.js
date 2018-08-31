const Joi = require("joi");
const config = require("../../../config");

module.exports = {
  post: Joi.object().keys({
    x: Joi.number()
      .integer()
      .min(0)
      .max(config.canvas.width - 1)
      .required(),
    y: Joi.number()
      .integer()
      .min(0)
      .max(config.canvas.height - 1)
      .required(),
    color: Joi.number()
      .integer()
      .min(0)
      .max(config.canvas.colors.length - 1)
      .required()
  })
};
