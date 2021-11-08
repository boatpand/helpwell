const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SubdistrictSchema = new Schema(
  {
    Subdistrict_Name: {
      type: String,
    },
    Subdistrict_Code: {
      type: String,
    },
  },
  {
    collection: "Subdistrict",
  }
);

module.exports = mongoose.model("Subdistrict", SubdistrictSchema);