const mongodb = require("mongodb");
let db;
/**
 * connects to the mongodb with the given settings
 * @param {string} uri mongodb connection string
 * @param {string} dbName database name
 * @returns {Promise<void>} promise
 */
async function connect(uri, dbName) {
  const client = await mongodb.MongoClient.connect(
    uri,
    { useNewUrlParser: true }
  );
  db = client.db(dbName);
}
/**
 * returns a reference to the mongodb collection
 * @param {string} name collection name
 * @returns {Collection} the collection
 */
function collection(name) {
  return db.collection(name);
}
module.exports = {
  connect,
  collection
};
