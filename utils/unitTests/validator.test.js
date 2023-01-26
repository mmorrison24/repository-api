const validator = require("../validator");
const Joi = require("joi");

const schema = validator;

describe("test the validator", () => {
  test("not allowed fields", () => {
    const { error } = Joi.object(schema).validate({ username: "ousf", birth_year: 1994 });
    expect(error).toMatchObject({ message: '"username" is not allowed' });
  });

  test("id must be a string", () => {
    const testValue = "63ca90cd76c196b3b8a3a03";

    const { id } = schema;
    const { error } = Joi.object({ id: id() }).validate({ id: testValue });

    expect(error.message).toBe(`"id" with value "${testValue}" fails to match the required pattern: /^[a-f\\d]{24}$/i`);
  });

  test("name must be a string", () => {
    const testValue = 3;

    const { name } = schema;
    const { error } = Joi.object({ name: name() }).validate({ name: testValue });

    expect(error.message).toBe('"name" must be a string');
  });

  test("email must be a valid email", () => {
    const testValue = "frf";

    const { email } = schema;
    const { error } = Joi.object({ email: email() }).validate({ email: testValue });

    expect(error.message).toBe('"email" must be a valid email');
  });

  test("limit must be a valid positive number", () => {
    const testValue = "frf";

    const { limit } = schema;
    const { error } = Joi.object({ limit: limit({ min: 1, max: 2, defaultValue: 12 }) }).validate({ limit: testValue });

    expect(error.message).toBe("limit should be a valid positive number");
  });
});
