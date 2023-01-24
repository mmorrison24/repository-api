require("dotenv").config({});

const STStay = require("../../models/stay/st_stay");

class STStayController {
  /**
   * construct the a controller based on a given mongoose model
   * @param {*} Model
   */
  constructor(Model) {
    this.Model = Model;
  }
}

module.exports = new STStayController(STStay);
