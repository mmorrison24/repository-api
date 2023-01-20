const logger = require("./../utils/logger").logger;

/**
 * this is a error handler middleware, that override the default express error handler
 * override it by setting any unknown error status to 500 status, if the status is exist
 * ex: 400, 403, ... m it wi
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

// eslint-disable-next-line
const errorHandler = function (err, req, res, next) {
  console.log(err);
  res.status(err.statusCode).send(err.message);
  logger.error(err.message + " : " + err.stack && err.stack.split("\n").splice(0, 2).join(" =>"));

  if (err instanceof Error && !err.statusCode) {
    err.statusCode = 500;
    res.status(err.statusCode).send("INTERNAL_SERVER_ERROR");
  } else {
    res.status(err.statusCode).send(err.message);
  }
};
module.exports = errorHandler;
