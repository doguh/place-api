const mongodb = require("mongodb");
const amqp = require("amqplib");
const config = require("../config");

const q = config.amqp.queue;

/**
 * The mongodb collection used to store tiles colors
 */
let collection;

/**
 * Rabbitmq channel used to read/write pixel color change events
 */
let channel;

/**
 * Initialize the canvas application (database, rabbitmq)
 * @returns {Promise<void>} Promise
 */
async function init() {
  // init database
  const db = await mongodb.MongoClient.connect(
    config.db.uri,
    { useNewUrlParser: true }
  );
  console.log("db ready");
  collection = db.db(config.db.name).collection(config.db.collection);

  // init rabbitmq channel
  const conn = await amqp.connect(config.amqp.uri);
  channel = await conn.createChannel();
  channel.assertQueue(q, { durable: false });
  channel.consume(
    q,
    msg => {
      console.log("amqp message received: %s", msg.content.toString());
    },
    { noAck: true }
  );
  console.log("amqp ready");
}

/**
 * Get the canvas data
 * @returns {Promise<any[]>} the data
 */
async function getCanvasData() {
  return collection
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
  await collection.updateOne(
    { x, y },
    { $set: { x, y, color } },
    { upsert: true }
  );
  const msg = JSON.stringify({ x, y, color });
  channel.sendToQueue(q, Buffer.from(msg));
  return true;
}

module.exports = {
  init,
  getCanvasData,
  setPixel
};
