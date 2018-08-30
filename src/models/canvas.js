const { Hub } = require("@toverux/expresse");
const config = require("../config");

const buffer = Buffer.alloc(config.canvas.width * config.canvas.height, 0);

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
 * @returns {String} base64 encoded data
 */
function getCanvasData() {
  return buffer.toString("base64");
}

/**
 * Updates a pixel's color
 * @param {number} x Pixel's x coordinate
 * @param {number} y Pixel's y coordinate
 * @param {number} color New pixel's color
 * @returns {boolean} true in case of success
 */
function setPixel(x, y, color) {
  // TODO log updates events in another collection
  buffer.writeInt8(color, x + y * config.canvas.width);
  hub.data({ x, y, color });
}

module.exports = {
  init,
  hub,
  getCanvasData,
  setPixel
};
