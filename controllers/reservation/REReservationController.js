const REReservation = require("../../models/reservation/re_reservation");
const { RESERVATION_STATUS } = require("../../config/constants");
const Error = require("http-errors");

require("dotenv").config({});

class REReservationController {
  /**
   * construct the a controller based on a given mongoose model
   * @param {*} Model
   */
  constructor(Model) {
    this.Model = Model;
  }
  async cancel(_id) {
    let reservation = await this.Model.findOne({ _id });
    const status = RESERVATION_STATUS.CANCELED;
    if (!reservation) throw Error(404, "ELEMENT_DOES_NOT_EXIT");

    if (reservation.status === RESERVATION_STATUS.CANCELED) throw Error(400, "STATUS_ALREADY_CANCELED");

    let response = await this.Model.findOneAndUpdate({ _id }, { status }, { new: true });

    return response;
  }
}

module.exports = new REReservationController(REReservation);
