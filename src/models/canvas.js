const mongodb = require("mongodb");
const amqp = require("amqplib");
const { Hub } = require("@toverux/expresse");
const config = require("../config");
const mongoHelper = require("../helpers/mongo");

/**
 * SSE Hub, used to notify clients of color changes
 */
const hub = new Hub();

/**
 * Rabbitmq channel used to read/write pixel color change events
 */
let channel;

/**
 * Initialize the canvas application (database, rabbitmq)
 * @returns {Promise<void>} Promise
 */
async function init() {
  // init rabbitmq channel
  const conn = await amqp.connect(config.amqp.uri);
  channel = await conn.createChannel();
  channel.assertExchange(config.amqp.exchange, "fanout", { durable: false });
  const q = await channel.assertQueue("", { exclusive: true });
  channel.bindQueue(q.queue, config.amqp.exchange, "");
  channel.consume(
    q.queue,
    function(msg) {
      const data = JSON.parse(msg.content.toString());
      hub.data(data);
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
  return mongoHelper
    .collection(config.db.collection)
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
  await mongoHelper
    .collection(config.db.collection)
    .updateOne({ x, y }, { $set: { x, y, color } }, { upsert: true });
  const msg = JSON.stringify({ x, y, color });
  channel.publish(config.amqp.exchange, "", Buffer.from(msg));
  return true;
}

module.exports = {
  init,
  hub,
  getCanvasData,
  setPixel
};
