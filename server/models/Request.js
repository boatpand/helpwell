const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RequestSchema = new Schema(
  {
    Food: {
      type: Boolean,
    },
    count_Food: {
      type: Number,
    },
    Medicine: {
      type: Boolean,
    },
    count_Medicine: {
      type: Number,
    },
    Bed: {
      type: Boolean,
    },
    count_Bed: {
      type: Number,
    },
    Hospital: {
      type: Boolean,
    },
    count_Hospital: {
      type: Number,
    },
    Home: {
      type: Boolean,
    },
    count_Home: {
      type: Number,
    },
    Other: {
      type: String,
    },
    count_Other: {
      type: Number,
    },
    Option: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Request",
  }
);

module.exports = mongoose.model("Request", RequestSchema);
