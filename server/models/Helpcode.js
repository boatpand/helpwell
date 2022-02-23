const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let HelpCodeSchema = new Schema(
  {
    Helpcode: {
      type: String,
    },
    Helptype: {
      type: String,
    },
  },
  {
    collection: "HelpCode",
  }
);

module.exports = mongoose.model("HelpCode", HelpCodeSchema);
