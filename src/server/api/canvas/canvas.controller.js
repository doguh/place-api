const Joi = require("joi");
const schemas = require("./canvas.schemas");
const canvas = require("../../../models/canvas");

/**
 * Returns all canvas data
 * @param {object} req Express Request
 * @param {object} res Express Response
 * @returns {Promise<any>}
 */
async function get(req, res) {
  const data = canvas.getCanvasData();
  res.status(200).send(data);
}

/**
 * Updates a pixel on the canvas
 * @param {object} req Express Request
 * @param {object} res Express Response
 * @returns {Promise<any>}
 */
async function post(req, res) {
  const requestData = Joi.attempt(req.body, schemas.post);
  canvas.setPixel(requestData.x, requestData.y, requestData.color);
  res.status(200).send({ success: true });
}

module.exports = {
  get,
  post
};
