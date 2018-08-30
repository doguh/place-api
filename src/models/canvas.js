const mongodb = require("mongodb");
const amqp = require("amqplib");
const { Hub } = require("@toverux/expresse");
const config = require("../config");

/**
 * SSE Hub, used to notify clients of color changes
 */
const hub = new Hub();

/**
 * @returns {Promise<void>} Promise
 */
async function init() {}

/**
 * Get the canvas data
 * @returns {Promise<any[]>} the data
 */
async function getCanvasData() {
  // TODO
}

/**
 * Updates a pixel's color
 * @param {number} x Pixel's x coordinate
 * @param {number} y Pixel's y coordinate
 * @param {number} color New pixel's color
 * @returns {boolean} true in case of success
 */
async function setPixel(x, y, color) {
  // TODO log updates events in another collection
  // TODO
}

module.exports = {
  init,
  hub,
  getCanvasData,
  setPixel
};
