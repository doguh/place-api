const fs = require("fs");
const { Hub } = require("@toverux/expresse");
const config = require("../config");

/**
 * Buffer used to store canvas pixels
 */
const buffer = Buffer.alloc(config.canvas.width * config.canvas.height, 0);

/**
 * SSE Hub, used to notify clients of color changes
 */
const hub = new Hub();

/**
 * initialize the canvas
 * @returns {void}
 */
function init() {
  try {
    const savedBuffer = fs.readFileSync(config.canvas.file);
    savedBuffer.copy(buffer);
  } catch (error) {
    console.log(`buffer file ${config.canvas.file} does not exist yet`);
    fs.writeFileSync(config.canvas.file, buffer);
  }
}

/**
 * Get the canvas data
 * @returns {any} object containing informations about canvas
 */
function getCanvasData() {
  const data = buffer.toString("base64");
  return {
    width: config.canvas.width,
    height: config.canvas.height,
    colors: config.canvas.colors,
    data
  };
}

/**
 * Updates a pixel's color
 * @param {number} x Pixel's x coordinate
 * @param {number} y Pixel's y coordinate
 * @param {number} color New pixel's color
 * @returns {boolean} true in case of success
 */
function setPixel(x, y, color) {
  // TODO log updates events in a mongo collection
  buffer.writeInt8(color, x + y * config.canvas.width);
  hub.data({ x, y, color });
  fs.writeFile(config.canvas.file, buffer, err => {
    if (err) {
      console.error(err, "error while saving buffer to file");
    }
  });
}

module.exports = {
  init,
  hub,
  getCanvasData,
  setPixel
};
