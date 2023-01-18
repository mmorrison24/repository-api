const ACUser = require("../../models/account/ac_user");

class ACUserController {
  /**
   * construct the a controller based on a given mongoose model
   * @param {*} Model
   */
  constructor(Model) {
    this.Model = Model;
  }
}

module.exports = new ACUserController(ACUser);
