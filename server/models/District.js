const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DistrictSchema = new Schema(
  {
    District_Name: {
      type: String,
    },
    District_Code: {
      type: String,
    },
    ZIP_code: {
      type: String,
    },
  },
  {
    collection: "District",
  }
);

module.exports = mongoose.model("District", DistrictSchema);
