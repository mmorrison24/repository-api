const Joi = require("joi");
const createError = require("http-errors");
const REReservationController = require("../../controllers/reservation/REReservationController");
const STStayController = require("../../controllers/stay/STStayController");
const ACUserController = require("../../controllers/account/ACUserController");
const validator = require("../../utils/validator");

module.exports = {
  permissions: "public",
  validate: {
    body: {
      guest: validator.id().required().description("guest ID").error(createError(400, "INVALID_GUEST_ID")),
      reservation: validator.id().required().description("reservation ID").error(createError(400, "INVALID_RESERVAION_ID")),
      upcoming: Joi.object({
        stays: Joi.number().description("number of upcoming stays").error(createError(400, "UPCOMING_STAYS_MUST_BE_A_NUMBER")),
        nights: Joi.number().description("number of upcoming stays night").error(createError(400, "UPCOMING_NOGHTS_MUST_BE_A_NUMBER")),
      }),
      past: Joi.object({
        stays: Joi.number().description("number of past stays").error(createError(400, "PAST_STAYS_MUST_BE_A_NUMBER")),
        nights: Joi.number().description("number of past stays night").error(createError(400, "PAST_NIGHTS_MUST_BE_A_NUMBER")),
      }),
      canceledStay: Joi.number().description("number of cancelled stays").error(createError(400, "CANCELLED_STAYS_MUST_BE_A_NUMBER")),
    },
  },
  handler: async ({ body }) => {
    // check if the guest is in db
    const existingGuest = await ACUserController.Model.findOne({ _id: body.guest }).distinct("roles");
    if (!existingGuest.includes("guest")) throw createError(400, "GUEST_NOT_FOUND");

    // check if the reservation is associated to the guest
    const reservationCheck = await REReservationController.Model.findOne({ _id: body.reservation });
    if (reservationCheck.guest.toString() !== body.guest) throw createError(400, "WRONG_RESERVATION");

    const pastStayAmount = reservationCheck.baseStayAmount + reservationCheck.taxAmount * body.past.stays;
    const upcomingStayAmount = reservationCheck.baseStayAmount + reservationCheck.taxAmount * body.upcoming.stays;
    const totalStayAmount = reservationCheck.baseStayAmount + reservationCheck.taxAmount * (body.past.stays + body.upcoming.stays);

    const doc = { upcomingStayAmount, pastStayAmount, totalStayAmount, ...body };

    const staySummary = await STStayController.Model.create(doc);
    if (!staySummary) throw Error(500, "INTERNAL_SERVER_ERROR");

    return staySummary;
  },
};
