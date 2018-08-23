const express = require("express");
const config = require("./config");
const configureServer = require("./server");
const canvas = require("./models/canvas");

const app = express();

app.listen(config.server.port, async () => {
  await canvas.init();
  configureServer(app);
  console.log(`server running on port ${config.server.port}`);
});
