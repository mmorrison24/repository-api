const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../databases/mongodb");

const staySchema = new Schema(
  {
    guest: { type: Schema.Types.ObjectId, ref: "ac_user" },
    reservation: { type: Schema.Types.ObjectId, ref: "re_reservation" },
    upcoming: {
      stays: { type: Number, required: true },
      nights: { type: Number },
    },
    past: {
      stays: { type: Number, required: true },
      nights: { type: Number },
    },
    upcomingStayAmount: { type: Number, required: true },
    pastStayAmount: { type: Number, required: true },
    totalStayAmount: { type: Number, required: true },
    canceledStay: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.database.model("st_stay", staySchema);
