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
// const defaultJoiRegExp = new RegExp(/^".*" is not allowed/);
// The routes should follow this pattern: it start with "/", and there's no "/" at the end

// eslint-disable-next-line
const errorHandler = function (err, req, res, next) {
  logger.error(err.message + " : " + err.stack && err.stack.split("\n").splice(0, 2).join(" =>"));

  // incase a developer send something else than default value of the header
  if (err instanceof Error && !err.statusCode) {
    err.statusCode = 500;
    res.status(err.statusCode).send("INTERNAL_SERVER_ERROR");
  } else {
    res.status(err.statusCode).send(err.message);
  }

  if (process.env.NODE_ENV === "production") {
    try {
      // In case the body contain a property "password", we replace it!
      if (req.body.password) req.body.password = "*****";

      // Call the chat.postMessage method using the WebClient
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = errorHandler;
