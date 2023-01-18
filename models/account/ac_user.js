const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../databases/mongodb");

const userSchema = new Schema(
  {
    //  authentication credentials
    email: { type: String, required: true, es_indexed: true },

    password: { type: String, required: true },
    passwordUpdateAt: Date,

    // user profile information
    title: String, // Mr/ Mme
    firstName: { type: String, es_indexed: true },
    lastName: { type: String, es_indexed: true },
    birthDate: Date,
    country: { type: Schema.Types.ObjectId, ref: "or_country" },

    //user roles ex: super-admin , admin , operator, client, guest...
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
