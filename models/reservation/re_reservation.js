const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../databases/mongodb");
const { RESERVATION_STATUS, RESERVATION_STATUS_ENUM } = require("../../config/constants");

const reservationSchema = new Schema(
  {
    guest: { type: Schema.Types.ObjectId, ref: "ac_user" },
    hotel: { type: Schema.Types.ObjectId, ref: "ho_hotel" },
    arrivalDate: { type: Date },
    departureDate: { type: Date },
    status: { type: String, enum: RESERVATION_STATUS_ENUM, default: RESERVATION_STATUS.ACTIVE, required: true },
    baseStayAmount: { type: Number },
    taxAmount: { type: Number, default: 19 },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.database.model("re_reservation", reservationSchema);
