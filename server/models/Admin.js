const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AdminSchema = new Schema(
  {
    Mobile: {type: String},
    Password: {type: String}
  },
  {
    collection: "Admin",
  }
);

module.exports = mongoose.model("Admin", AdminSchema);