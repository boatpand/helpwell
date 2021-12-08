const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var current = new Date();
const timeStamp = new Date(
  Date.UTC(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    current.getHours(),
    current.getMinutes(),
    current.getSeconds(),
    current.getMilliseconds()
  )
);

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
      default: timeStamp,
    },
  },
  {
    collection: "Request",
  }
);

module.exports = mongoose.model("Request", RequestSchema);
