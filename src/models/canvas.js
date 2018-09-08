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
const image = new Jimp(config.canvas.width, config.canvas.height, "#FFFFFFFF");

/**
 * initialize the canvas
 * @returns {Promise}
 */
async function init() {
  try {
    const savedImage = await Jimp.read(config.canvas.file);
    image.composite(savedImage, 0, 0);
  } catch (error) {
    console.log(`file ${config.canvas.file} does not exist yet`);
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
  const cssColor = config.canvas.colors[color];
  const realColor = Jimp.cssColorToHex(cssColor);
  if (image.getPixelColor(x, y) === realColor) {
    return false;
  }
  image.setPixelColor(Jimp.cssColorToHex(realColor), x, y);
  hub.data({ x, y, color: cssColor });
  saveImageToFile();

  if (config.logEvents && req) {
    mongoHelper.collection("events").insertOne({
      px: { x, y, color: cssColor },
      meta: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        date: new Date()
      }
    });
  }

  return true;
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
