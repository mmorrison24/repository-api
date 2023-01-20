const ACUser = require("../../models/account/ac_user");
const bcrypt = require("bcrypt");
require("dotenv").config({});
const { JWT_SALT } = process.env;

class ACUserController {
  /**
   * construct the a controller based on a given mongoose model
   * @param {*} Model
   */
  constructor(Model) {
    this.Model = Model;
  }

  async findByEmail(email) {
    return await this.Model.findOne({ email: email.toLowerCase() });
  }

  /**
   * compare a given password to the a hashed password using bycrypt
   * @param {string} password
   * @param {string} hashedPassword
   */
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async checkEmailAndPassword(email, password) {
    const user = await this.Model.findOne({ email: email.toLowerCase() });
    if (!user) throw new Error(400, "EMAIL_DOES_NOT_EXIST");
    let ok = await this.comparePassword(password, user.password);
    if (!ok) throw new Error(400, "PASSWORD_INCORRECT");

    return user;
  }

  /**
   * hash the client password before saving it
   * @param {string} password
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, parseInt(JWT_SALT));
  }

  async updateJwt(_id, jwt) {
    return await this.Model.findOneAndUpdate({ _id }, { $set: { jwt } }, { new: true });
  }

  async createNewAccount(email, password, title, firstName, lastName, birthDate = null, roles) {
    email = email.toLowerCase();
    return await this.Model.create({
      email,
      password,
      title,
      firstName,
      lastName,
      birthDate,
      roles,
    });
  }
}

module.exports = new ACUserController(ACUser);
