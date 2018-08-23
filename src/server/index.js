const apiRouter = require("./api");

module.exports = function configureServer(app) {
  app.use("/api", apiRouter);
};
