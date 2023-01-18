const ACUserController = require("../controllers/account/ACUserController");
const Error = require("http-errors");
const { ADMINGUARD_ROLES_ENUM } = require("../config/constants");

const gardAdmin = async (req, res, next) => {
  if (req.user && req.user.roles.includes("admin")) {
    let { id } = req.user;

    try {
      let authorized = await ACUserController.Model.findOne({
        _id: id,
        email: {
          $in: ["oussamasf00@gmail.com"],
        },
      });

      if (!authorized) next(Error(403, "Forbidden"));
      else next();
    } catch (error) {
      next(error);
    }
  } else if (req.originalUrl.startsWith(`/api/${process.env.ROUTES_DIRECTORY_ADMIN_NAME}/`)) {
    // Check if the user has one of the allowed roles from ADMINGUARD_ROLES_ENUM
    const hasBackOfficeRole = req.user.roles.some(role => ADMINGUARD_ROLES_ENUM.includes(role));
    if (!hasBackOfficeRole) next(Error(403, "Forbidden"));
    else next();
  } else {
    next();
  }
};

module.exports = { gardAdmin };
