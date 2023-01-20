const { sign, verify } = require("jsonwebtoken");
require("dotenv").config({});
const { JWT_AUTH_SECRET, EMAIL_TOKEN_SECRET } = process.env;
const Error = require("http-errors");

/**
 *
 * @param {string} authorization
 * @returns {Promise<string>}
 */
const getAuthorizationToken = authorization => {
  const JWT_MIN_LENGTH = 140;
  const token = authorization.split(" ")[1];
  if (!token || token.length > JWT_MIN_LENGTH) Error(401, "Login is required");
  return token;
};

/**
 * express middleware that extract a bearer token stored in authorization item from req.headers
 * and decrypt it using jwt secret, if it's valid, it's translate the token into play-load composed of
 * user data (ex: id, roles), then attach that decrypted data in to req object, in order to be accessible by
 * the others middleware and handler
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
//TODO env var issue
const jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = getAuthorizationToken(authorization);
    req.user = verify(token, JWT_AUTH_SECRET);
    // let { jwt } = await ACUserController.Model.findOne({ _id: payload.id }).select("jwt")
    // if (jwt !== token) next(Error(401, "your access control has changed, need login again "));
    // console.log({ jwt, token })
  } catch (e) {
    next(Error(401, "Login is required"));
  }
  next();
};

/**
 * this the encryption function used to generate json web token
 * to be send to user, in case of successful login or sign-up
 * @param {*} payload
 */
const signer = payload => sign(payload, JWT_AUTH_SECRET);

const emailTokenSigner = ({ payload, expiresIn = null }) => sign(payload, EMAIL_TOKEN_SECRET, { expiresIn });

module.exports = { jwtMiddleware, signer, emailTokenSigner };
