const fs = require("fs");
const Jimp = require("jimp");
const { throttle } = require("lodash");
const { Hub } = require("@toverux/expresse");
const config = require("../config");
const mongoHelper = require("../helpers/mongo");

/**
 * SSE Hub, used to notify clients of color changes
 */
const hub = new Hub();

/**
 * Jimp Image
 */
let image;

/**
 * initialize the canvas
 * @returns {Promise}
 */
async function init() {
  try {
    image = await Jimp.read(config.canvas.file);
  } catch (error) {
    console.log(`file ${config.canvas.file} does not exist yet`);
    image = new Jimp(config.canvas.width, config.canvas.height, "#FFFFFFFF");
  }
}

/**
 * Get the canvas data
 * @returns {Promise<any>} object containing informations about canvas
 */
async function getCanvasData() {
  const data = await image.getBase64Async(Jimp.MIME_PNG);
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
 * @param {Request} req express request
 * @returns {boolean} true in case of success
 */
function setPixel(x, y, color, req) {
  image.setPixelColor(Jimp.cssColorToHex(config.canvas.colors[color]), x, y);
  hub.data({ x, y, color });
  saveImageToFile();

  if (config.logEvents && req) {
    mongoHelper.collection("events").insertOne({
      px: { x, y, color },
      meta: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        date: new Date()
      }
    });
  }
}

/**
 * Throttled function that saves the buffer data to the filesystem,
 * at most every 5 seconds
 */
const saveImageToFile = throttle(async () => {
  console.log("saving image to filesystem");
  try {
    await image.writeAsync(config.canvas.file);
  } catch (error) {
    console.error(err, "error while saving image to file");
  }
}, config.canvas.saveThrottle);

module.exports = {
  init,
  hub,
  getCanvasData,
  setPixel
};
