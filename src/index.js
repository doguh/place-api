const express = require("express");
const config = require("./config");
const configureServer = require("./server");
const canvas = require("./models/canvas");
const mongoHelper = require("./helpers/mongo");

const app = express();

if (config.trustProxy) {
  app.enable("trust proxy");
}

app.listen(config.server.port, async () => {
  if (config.logEvents) {
    await mongoHelper.connect(
      config.db.uri,
      config.db.name
    );
    console.log("db ready");
  } else {
    console.log("config LOG_EVENT is set to false, skiping db connection");
  }
  await canvas.init();
  console.log("canvas ready");
  configureServer(app);
  console.log(`server running on port ${config.server.port}`);
});
