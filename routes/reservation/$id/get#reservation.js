const REReservationController = require("../../../controllers/reservation/REReservationController");
const validator = require("../../../utils/validator");
var createError = require("http-errors");

module.exports = {
  permissions: "public",
  validate: {
    params: {
      id: validator.id().required().description("param id").error(createError(400, "INVALID_RESERVATION_ID")),
    },
  },
  handler: async ({ params }) => {
    const { id } = params;
    const filter = { _id: id };

    let result = await REReservationController.Model.findOne(filter);
    if (!result) throw createError(400, "RESERVATION_DOES_NOT_EXIT");
    return result;
  },
};
