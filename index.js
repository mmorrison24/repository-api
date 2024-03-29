// const path = require("path");

const express = require("express");
const bodyParser = require("body-parser"); // body parser
const compression = require("compression");
const cors = require("cors");
const useragent = require("express-useragent");

const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config({});

const { logger, loggerMiddleware } = require("./utils/logger"); // logger middleware
require("./databases/mongodb"); // initiate database connection

const router = require("./routes"); // all API routes will defined here

let PORT = process.env.PORT || 4000;

const app = new express();

app.set("trust proxy", true);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(useragent.express());
app.use(compression());

/**
 * generate and bind routes to app instance
 */
router(app);

app.use("*", (req, res, next) => {
  res.status(404);
  res.send("NOT_FOUND");
  next();
});

app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  logger.info("Hotel server is listening on port", PORT);
});

module.exports = httpServer;
