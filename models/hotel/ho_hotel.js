const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../databases/mongodb");

const hotelSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    landLine: { type: String },
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      address: String,
      zipCode: { type: Number },
    },
    website: { type: String },
    manager: { type: Schema.Types.ObjectId, ref: "ac_user" },
    rank: { type: Number },
  },
  {
    timestamps: true,
  }
);

hotelSchema.index({ name: 1 }, { unique: true, sparse: true });

module.exports = connection.database.model("ho_hotel", hotelSchema);
