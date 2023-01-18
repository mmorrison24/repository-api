const log4js = require("log4js");

log4js.configure({
  disableClustering: true,
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: {
      appenders: ["console"],
      // level: process.env.NODE_ENV === "production" ? "error" : "info",
      level: "info",
    },
  },
});

// const levels = {
//   trace: log4js.levels.TRACE,
//   debug: log4js.levels.DEBUG,
//   info: log4js.levels.INFO,
//   warn: log4js.levels.WARN,
//   error: log4js.levels.ERROR,
//   fatal: log4js.levels.FATAL,
// };
const logger = log4js.getLogger("APP");
const loggerMiddleware = log4js.connectLogger(logger);

module.exports = { logger, loggerMiddleware };
