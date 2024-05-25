const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    houseNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    countary: {
      type: String,
    },
    isValid: {
      type: Number,
      default: 1,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, autoCreate: true, versionKey: false }
);

module.exports = mongoose.model("addresse", mySchema);
