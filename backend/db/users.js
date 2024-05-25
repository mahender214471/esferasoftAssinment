const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema(
  {
    name: String,
    age: String,
  },
  { timestamps: true, autoCreate: true, versionKey: false }
);

module.exports = mongoose.model("user", mySchema);
