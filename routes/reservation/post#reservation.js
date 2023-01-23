const Joi = require("joi");
const Error = require("http-errors");
const REReservationController = require("../../controllers/reservation/REReservationController");
const ACUserController = require("../../controllers/account/ACUserController");
const { RESERVATION_STATUS, RESERVATION_STATUS_ENUM } = require("../../config/constants");

module.exports = {
  permissions: "public",
  validate: {
    body: {
      guest: Joi.string().required().description("guest ID").error(Error(400, "GUEST_ID_MUST_BE_OBJECTID")),
      hotel: Joi.string().description("hotel ID").error(Error(400, "HOTEL_ID_MUST_BE_OBJECTID")),
      arrivalDate: Joi.date().required().description("arrival date").error(Error(400, "ARRIVAL_DATE_MUST_BE_A_DATE_FORMAT")),
      departureDate: Joi.date().required().description("departure date").error(Error(400, "BIRTH_DATE_MUST_BE_A_DATE_FORMAT")),
      status: Joi.string()
        .valid(...RESERVATION_STATUS_ENUM)
        .default(RESERVATION_STATUS.ACTIVE)
        .description("status of reservation")
        .error(Error(400, "STATUS_MUST_BE_VALID_STRING")),
      baseStayAmount: Joi.number().required().description("base amount").error(Error(400, "BASE_AMOUNT_MUST_BE_A_NUMBER")),
      taxAmount: Joi.number().required().description("tax amount").error(Error(400, "TAX_AMOUNT_MUST_BE_A_NUMBER")),
    },
  },
  handler: async ({ body }) => {
    // check if the guest is in db
    const existingGuest = await ACUserController.Model.findOne({ _id: body.guest }).distinct("roles");
    //! error and value guest if hard coded change later
    if (!existingGuest.includes("guest")) throw Error(400, "GUEST_NOT_FOUND");

    const newReservation = await REReservationController.Model.create(body);
    if (!newReservation) throw Error(500, "INTERNAL_SERVER_ERROR");

    return newReservation;
  },
};
