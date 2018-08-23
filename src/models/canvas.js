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

module.exports = {
  getCanvasData
};
