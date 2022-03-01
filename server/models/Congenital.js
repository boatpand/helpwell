const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CongenitalSchema = new Schema(
  {
    Mobile: {type: String},
    Disease: {type: String},
    // Other: {type: String}
  },
  {
    collection: "Congenital",
  }
);

module.exports = mongoose.model("Congenital", CongenitalSchema);