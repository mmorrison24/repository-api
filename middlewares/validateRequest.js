const Joi = require("joi");
/**
 * A validation middleware, where it takes joi schema object as arguments,
 * to validate it against req.body, req.query, req.params, req.header, if validation
 * fails, a custom error will be throw based on what's written in the validation object
 * @param validate
 */

module.exports = validate => async (req, _, next) => {
  for (const key of Object.keys(validate)) {
    // Generating slugs from the title
    // parse nested query object
    // we dont apply this parsing on the old API old admin
    if (key === "query") {
      try {
        if (req[key].query && typeof req[key].query == "string") req[key].query = JSON.parse(req[key].query);
        if (req[key].sort && typeof req[key].sort == "string") req[key].sort = JSON.parse(req[key].sort);
      } catch (error) {
        throw new Error(error);
      }
    }
    if (!Joi.isSchema(validate[key])) validate[key] = Joi.object(validate[key]);

    req[key] = await validate[key].validateAsync(req[key]);
  }
  next();
};
