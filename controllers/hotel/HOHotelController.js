require("dotenv").config({});

const HOHotel = require("../../models/hotel/ho_hotel");

class HOHotelController {
  /**
   * construct the a controller based on a given mongoose model
   * @param {*} Model
   */
  constructor(Model) {
    this.Model = Model;
  }
}

module.exports = new HOHotelController(HOHotel);
