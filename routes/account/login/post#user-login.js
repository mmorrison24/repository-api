const Joi = require("joi");
const Error = require("http-errors");
const ACUserController = require("../../../controllers/account/ACUserController");
const { signer } = require("../../../middlewares/jwt");
const { signupErrors } = require("../../../utils/errorCode");

module.exports = {
  permissions: "public",
  validate: {
    body: {
      email: Joi.string().required().description("user email").error(new Error(400, signupErrors.EMAIL_IS_REQUIRED)),
      password: Joi.string().required().description("user password").error(new Error(400, signupErrors.PASSWORD_REQUIRED)),
    },
  },
  handler: async ({ body }) => {
    const { email, password } = body;
    const user = await ACUserController.checkEmailAndPassword(email, password);
    let jwt = signer({ id: user._id, roles: user.roles });
    await ACUserController.updateJwt(user._id, jwt);
    return {
      id: email,
      token: jwt,
    };
  },
};
