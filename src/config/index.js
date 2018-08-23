module.exports = {
  server: {
    port: process.env.PORT || 80
  },
  db: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/place",
    name: "place",
    collection: "canvas"
  },
  amqp: {
    uri: process.env.AMQP_URI || "amqp://localhost",
    exchange: "cnv"
  }
};
