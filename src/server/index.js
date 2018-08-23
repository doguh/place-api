const bodyParser = require("body-parser");
const apiRouter = require("./api");
const errorHandler = require("../middlewares/errorHandler");

module.exports = function configureServer(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", apiRouter);

  app.use(errorHandler);
};
