const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RequestDetailSchema = new Schema(
  {
    RequestID: {
      type: String,
    },
    Helpcode: {
      type: String,
    },
    Count: {
      type: Number,
    },
    Option: {
      type: String,
    },
    Status: {
      type: String,
    },
  },
  {
    collection: "RequestDetail",
  }
);

module.exports = mongoose.model("RequestDetail", RequestDetailSchema);
