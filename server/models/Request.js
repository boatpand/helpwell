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

console.log(timeStamp);

let RequestSchema = new Schema(
  {
    Mobile: {
      type: String,
    },
    RequestID: {
      type: String,
    },
    Other: {
      type: String,
    },
    Status: {
      type: String,
    },
    Status_Text: {
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
