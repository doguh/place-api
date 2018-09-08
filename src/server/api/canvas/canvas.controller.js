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
  const data = await canvas.getCanvasData();
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
  const updated = canvas.setPixel(
    requestData.x,
    requestData.y,
    requestData.color,
    req
  );
  res.status(200).send({ updated });
}

/**
 * Display a snapshot of the canvas
 * @param {object} req Express Request
 * @param {object} res Express Response
 * @returns {Promise<any>}
 */
async function getSnapshot(req, res) {
  const data = await canvas.getSnapshot();
  res
    .type("image/png")
    .status(200)
    .send(data);
}

module.exports = {
  get,
  post,
  getSnapshot
};
