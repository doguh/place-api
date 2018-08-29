const express = require("express");
const config = require("./config");
const configureServer = require("./server");
const canvas = require("./models/canvas");
const mongoHelper = require("./helpers/mongo");

const app = express();

app.listen(config.server.port, async () => {
  await mongoHelper.connect(
    config.db.uri,
    config.db.name
  );
  console.log("db ready");
  await canvas.init();
  console.log("canvas ready");
  configureServer(app);
  console.log(`server running on port ${config.server.port}`);
});
