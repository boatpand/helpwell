const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let HelperuserSchema = new Schema(
  {
    Firstname: {type: String},
    Lastname: {type: String},
    Org_Name: {type: String},
    isOrg: {type: Boolean},
    Mobile:{type:String},
    Password:{type:String},
    Lat:{type:String},
    Lng:{type:String},
    House_No:{type:String},
    Soi:{type:String},
    Road:{type:String},
    Subdistrict:{type:String},
    District:{type:String},
    ZIP_Code:{type:String},
    Province:{type:String}
  },
  {
    collection: "Helperuser",
  }
);

module.exports = mongoose.model("Helperuser", HelperuserSchema);