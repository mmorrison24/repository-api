// eslint-disable-next-line import/no-unresolved
const accessControl = require("./accessControlSetting");
const Error = require("http-errors");
const { userErrors } = require("../utils/errorCode");
/**
 * this access control middleware , it check the user req.client.roles ability to
 * to apply an action to a given resource, action and resource extracted from actionResource
 * @param {string} actionResource
 */
function checkAccess(actionResource) {
  return function check(req, res, next) {
    if (!req.user || !req.user.roles) throw new Error(400, userErrors.USER_HAS_NO_ROLES);
    const [action, resource] = actionResource.split(".");

    let permission = accessControl.can(req.user.roles)[action](resource);
    if (!permission.granted) next(Error(403, "Your not authorized to this resource"));
    next();
  };
}

module.exports = checkAccess;
