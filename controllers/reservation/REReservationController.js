const REReservation = require("../../models/reservation/re_reservation");
require("dotenv").config({});

class REReservationController {
  /**
   * construct the a controller based on a given mongoose model
   * @param {*} Model
   */
  constructor(Model) {
    this.Model = Model;
  }
}

module.exports = new REReservationController(REReservation);
