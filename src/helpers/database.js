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
function getDatabse(name) {
  return databases[name];
}

/**
 * loop through a Mongodb Cursor and returns its documents
 *
 * @param {*} cursor a Mongodb Cursor
 *
 * @return {Array} array of documents
 */
async function getCursorDocuments(cursor) {
  const results = co(function* g() {
    const docs = [];
    while (yield cursor.hasNext()) {
      docs.push(yield cursor.next());
    }
    return docs;
  });
  const rs = await Promise.resolve(results);
  return rs;
}

module.exports = {
  connect,
  getDatabse,
  getCursorDocuments
};
