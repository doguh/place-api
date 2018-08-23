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
  return _getCanvasCollection()
    .find({}, { projection: { _id: 0, x: 1, y: 1, color: 1 } })
    .sort({ x: 1, y: 1 })
    .toArray();
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
  await _getCanvasCollection().update(
    { x, y },
    { x, y, color },
    { upsert: true }
  );
  return true;
}

module.exports = {
  getCanvasData,
  setPixel
};
