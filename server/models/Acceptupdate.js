const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AcceptupdateSchema = new Schema(
  {
    AcceptID: {type: String},
    Helpcode: {type: String},
  },
  {
    collection: "Acceptupdate",
  }
);

module.exports = mongoose.model("Acceptupdate", AcceptupdateSchema);