const express = require("express");
const helmet = require("helmet");

const asyncHandler = require("express-async-handler");
const router = express.Router();
const fs = require("fs");

const { jwtMiddleware } = require("../middlewares/jwt");
const { gardAdmin } = require("../middlewares/gardAdmin");
const checkAccess = require("../middlewares/checkAccess");
const validateRequest = require("../middlewares/validateRequest");
const expressHandler = require("../middlewares/expressHandler");
const { ROUTES_DIRECTORY_NAME } = process.env;

const apiHelmetMiddelware = () => helmet();

/**
 * directory where all API routes are located
 */
const dir = "./routes";

/**
 * Generate routes based on nested folders inside 'routes' directory, each directory
 * ends with a files named as http verb (get, post, put , delete, update),
 * these files follows the pattern verb#explanation.js (ex: get#user profile.js, post#client-login.js)
 * where the 'verb' will be used as http request method, and the 'explanation' will be used in the documentation,
 * and the directory will be used as route path
 * @param {string} dir routes root directory
 */
// regular expression for replace admin by key
// regular expression to check a valid file format
const fileNameFormat = /(get|put|post|delete)#[\w\s-]+\.js/;

const generateRoutes = dir => {
  fs.readdirSync(dir)
    .reverse()
    .forEach(filename => {
      const path = `${dir}/${filename}`;
      const stat = fs.statSync(path);
      if (stat && stat.isDirectory()) return generateRoutes(path); // if it's still directory keep diving until we find a files
      if (stat.isFile()) {
        if (filename.match(fileNameFormat)) {
          const [method] = filename.slice(0, -3).split("#"); // extract the method (http verb) the file name

          const requestUrl = dir.replace(`./${ROUTES_DIRECTORY_NAME}`, "").replace(/#/g, ":"); // use directory path as request url

          const controller = require(`.${path}`); // export controller object from the files at the end of the directory "path"
          const handler = controller.handler; // the route handler : here where the most business logic happens ex: manipulate database , data traitment, ...
          const permissions = controller.permissions; // routes permissions ex : public, admin, client , ...
          const validate = controller.validate; // validation object: is Joi schema used to validate body, params, headers, query
          const preMiddleware = Array.isArray(controller.preMiddleware) ? controller.preMiddleware : [];
          // const description = controller.description || "No description";
          // const responses = controller.responses;

          // if routes is not with public permission, needs to be protected
          if (!permissions.includes("public")) preMiddleware.unshift(jwtMiddleware, gardAdmin, checkAccess(permissions));

          router[method](
            requestUrl,
            apiHelmetMiddelware(),
            ...preMiddleware,
            asyncHandler(validateRequest(validate)),
            asyncHandler(expressHandler(handler))
          );
        }
      }
    });
};

/**
 * bind the router into express instance
 * @param {*} app express instance
 */
const bindRouter = app => {
  // Generate routes based on routes folder tree, and set them on the router object
  generateRoutes(dir);

  // Bind the router the express app instance
  app.use("/api", router);
};
module.exports = bindRouter;
