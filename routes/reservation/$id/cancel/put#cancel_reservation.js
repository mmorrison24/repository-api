const REReservationController = require("../../../../controllers/reservation/REReservationController");
const validator = require("../../../../utils/validator");
var createError = require("http-errors");

module.exports = {
  permissions: "public",
  validate: {
    params: {
      id: validator.id().required().description("reservation ID").error(createError(400, "INVALID_RESERVAION_ID")),
    },
  },

  handler: async ({ params }) => {
    const _id = params.id;

    return await REReservationController.cancel(_id);
  },
};
