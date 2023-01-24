const Joi = require("joi");
const createError = require("http-errors");
const REReservationController = require("../../../controllers/reservation/REReservationController");

module.exports = {
  permissions: "public",
  validate: {
    query: {
      from: Joi.date()
        .default(new Date(new Date().getFullYear(), 0, 1))
        .description("end Date filter")
        .error(createError(400, "START_DATE_MUST_BE_A_DATE")),
      to: Joi.date()
        .default(new Date(new Date().getFullYear(), 11, 31))
        .description("start Date filter")
        .error(createError(400, "END_DATE_MUST_BE_A_DATE")),
    },
  },
  handler: async ({ query }) => {
    let result = await REReservationController.search(query);
    return result;
  },
};

//
