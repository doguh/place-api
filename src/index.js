const express = require("express");
const config = require("./config");
const configureServer = require("./server");
const database = require("./helpers/database");

const app = express();

app.listen(config.server.port, async () => {
  await database.connect(
    config.db.uri,
    config.db.name
  );
  configureServer(app);
  console.log(`server running on port ${config.server.port}`);
});
