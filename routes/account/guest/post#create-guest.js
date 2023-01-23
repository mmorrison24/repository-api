const Joi = require("joi");
const Error = require("http-errors");
const ACUserController = require("../../../controllers/account/ACUserController");
const { signupErrors } = require("../../../utils/errorCode");

module.exports = {
  permissions: "createAny.ac_user",
  validate: {
    body: {
      email: Joi.string().description("client title").error(new Error(400, "title number is required")),
      title: Joi.string().description("client title").error(new Error(400, "title number is required")),
      firstName: Joi.string().description("client first name").error(new Error(400, "first name is required")),
      lastName: Joi.string().description("client last name").error(new Error(400, "last name is required")),
      birthDate: Joi.date().description("client birth date").error(new Error(400, "birth date is required")),
    },
  },
  handler: async ({ body }) => {
    let { email, ...restOfBody } = body;
    let roles = ["hotel_manager"];

    // Check if that email does not exist in our systems
    let existingUser = await ACUserController.Model.findOne({ email: email.toLowerCase() });
    if (existingUser) throw new Error(400, signupErrors.EMAIL_EXIST);

    //! this is a valnurability in api
    const password = Math.random();

    const newUser = await ACUserController.Model.create({ email, password, roles, ...restOfBody });
    if (!newUser) throw new Error(500, "INTERNAL_SERVER_ERROR");

    return newUser;
  },
};
