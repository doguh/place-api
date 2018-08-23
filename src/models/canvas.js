const mongodb = require("mongodb");
const amqp = require("amqplib");
const config = require("../config");

const q = config.amqp.queue;
let collection;
let chwrite;

async function init() {
  const db = await mongodb.MongoClient.connect(
    config.db.uri,
    { useNewUrlParser: true }
  );
  collection = db.db(config.db.name).collection(config.db.collection);

  const reader = await amqp.connect(config.amqp.uri);
  const chread = await reader.createChannel();
  chread.assertQueue(q, { durable: false });
  chread.consume(
    q,
    msg => {
      console.log("amqp message received: %s", msg.content.toString());
    },
    { noAck: true }
  );

  const writer = await amqp.connect(config.amqp.uri);

  chwrite = await writer.createChannel();

  chwrite.assertQueue(q, { durable: false });
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
  chwrite.sendToQueue(q, Buffer.from(msg));
  return true;
}

module.exports = {
  init,
  getCanvasData,
  setPixel
};
