const Joi = require("joi");
const constants = require("../../config/constants");
const Error = require("http-errors");

const validator = {
  id: () => Joi.string().regex(/^[a-f\d]{24}$/i),
  name: () => Joi.string().regex(/[\u0621-\u064A|a-z|A-Z|\u00C7|\u00E0|\u00E8|\u00E9]/),
  email: () => Joi.string().email().trim().lowercase(),
  string: (defaultValue = {}) =>
    Joi.string()
      .trim()
      .min(defaultValue.min ? defaultValue.min : 1),
  limit: ({ min = constants.MIN_PAGE_SIZE, max = constants.MAX_PAGE_SIZE, defaultValue = constants.PAGE_SIZE }) =>
    Joi.number().min(min).max(max).default(defaultValue).description("documents number").error(Error(400, "limit should be a valid positive number")),
  skip: ({ min = 0, defaultValue = 0 }) =>
    Joi.number()
      .min(min)
      .default(defaultValue)
      .description("document to be skipped")
      .error(Error(400, " skipping number should be a valid positive number")),
  sort: (defaultSort = { _id: -1 }) => Joi.object().default(defaultSort).description("the sorting field").error(Error(400, "wrong sorting")),
  query: (defaultQuery = {}) => Joi.object().default(defaultQuery).description("query condition").error(Error(400, "wrong query")),
};

module.exports = validator;
