const database = require("../helpers/database");
const config = require("../config");

/**
 * Get the canvas collection
 * @returns {Collection} the collection
 */
function _getCanvasCollection() {
  return database
    .getDatabase(config.db.name)
    .db(config.db.name)
    .collection(config.db.collection);
}

/**
 * Get the canvas data
 * @returns {Promise<any[]>} the data
 */
async function getCanvasData() {
  const cursor = _getCanvasCollection().find({});
  const data = await database.getCursorDocuments(cursor);
  return data;
}

/**
 * Updates a pixel's color
 * @param {number} x Pixel's x coordinate
 * @param {number} y Pixel's y coordinate
 * @param {number} color New pixel's color
 * @returns {boolean} true in case of success
 */
async function setPixel(x, y, color) {
  await _getCanvasCollection().update({ x, y }, { color }, { upsert: true });
  return true;
}

module.exports = {
  getCanvasData,
  setPixel
};
