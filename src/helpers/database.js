const mongodb = require("mongodb");
const co = require("co");

const databases = {};

/**
 * Connects to the database
 * @param {string} uri URI connection string
 * @param {string} name database identifier
 * @param {object} options Mongodb connection options
 * @returns {Database} database
 */
async function connect(uri, name, options = {}) {
  const db = await mongodb.MongoClient.connect(
    uri,
    options
  );
  databases[name] = db;
  return db;
}

/**
 * Get the database
 * @param {string} name database name
 * @returns {Database} database
 */
function getDatabase(name) {
  return databases[name];
}

module.exports = {
  connect,
  getDatabase
};
