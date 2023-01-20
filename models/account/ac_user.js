const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../databases/mongodb");

const userSchema = new Schema(
  {
    //  authentication credentials
    email: { type: String, required: true },

    password: { type: String, required: true },
    passwordUpdateAt: Date,

    // user profile information
    title: String, // Mr/ Mme
    firstName: { type: String },
    lastName: { type: String },
    birthDate: Date,
    country: { type: Schema.Types.ObjectId, ref: "or_country" },

    jwt: String,
    roles: [{ type: String }],

    createdBy: { type: Schema.Types.ObjectId, ref: "ac_user" },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });

module.exports = connection.database.model("ac_user", userSchema);
