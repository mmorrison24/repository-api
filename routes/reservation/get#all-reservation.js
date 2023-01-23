const REReservationController = require("../../controllers/reservation/REReservationController");
const validator = require("../../utils/validator");
module.exports = {
  permissions: "public",
  validate: {
    query: {
      limit: validator.limit({}),
      skip: validator.skip({}),
      query: validator.query(),
      sort: validator.sort(),
    },
  },
  handler: async ({ query }) => {
    const filter = query.query;
    // query from db
    // work on population
    const [items, count] = await Promise.all([
      REReservationController.Model.find(filter).limit(query.limit).sort(query.sort).skip(query.skip).populate("guest", "hotel"),
      REReservationController.Model.countDocuments(filter),
    ]);
    return { items, count };
  },
};
