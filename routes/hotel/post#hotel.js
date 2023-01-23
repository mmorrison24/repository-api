const Joi = require("joi");
const Error = require("http-errors");
const HOHotelController = require("../../controllers/hotel/HOHotelController");
const ACUserController = require("../../controllers/account/ACUserController");

module.exports = {
  permissions: "public",
  validate: {
    body: {
      name: Joi.string().required().description("Hotel name").error(new Error(400, "HOTEL_NAME_MUST_BE_A_VALID_STRING")),
      phone: Joi.string().description("hotel phone").error(new Error(400, "HOTEL_PHONE_MUST_BE_VALID")),
      landLine: Joi.string().required().description("hotel landline").error(new Error(400, "HOTEL_LANDLINE_MUST_BE_VALID")),
      address: Joi.object({
        country: Joi.string().description("country id").error(new Error(400, "COUNTRY_MUST_BE_VALID_STRING")),
        state: Joi.string().description("state").error(new Error(400, "STATE_MUST_BE_A_STRING")),
        city: Joi.string().description("city").error(new Error(400, "CITY_MUST_BE_A_STRING")),
        address: Joi.string().description("adress").error(new Error(400, "ADRESS_MUST_BE_A_STRING")),
        zipCode: Joi.number().description("zipcode").error(new Error(400, "ZIPCODE_MUST_BE_A_NUMBER")),
      }),
      website: Joi.string().description("hotel website").error(new Error(400, "HOTEL_WEBSITE_MUST_BE_VALID_STRING")),
      manager: Joi.string().required().description("hotel manager").error(new Error(400, "HOTEL_MANAGER_ID_MUST_BE_OBJECT_ID")),
      rank: Joi.number().required().description("hotel rank").error(new Error(400, "HOTEL_RANK_MUST_BE_A_VALID_NUMBER")),
    },
  },
  handler: async ({ body }) => {
    const { manager } = body;

    const existingManger = await ACUserController.Model.findOne({ _id: manager }).distinct("roles");
    //! error and hotel manager are hard coded change later
    if (!existingManger.includes("hotelManger")) throw new Error(400, "HOTEL_MANAGER_NOT_FOUND");

    let newHotel;
    try {
      newHotel = await HOHotelController.Model.create(body);
    } catch (error) {
      let { errmsg, name } = error;
      if (name === "MongoError" && errmsg.slice(0, 16) === "E11000 duplicate")
        throw new Error(400, "E11000 duplicate key error collection: { name: ffff }");
      throw new Error(500, "INTERNAL_SERVER_ERROR");
    }

    return newHotel;
  },
};
