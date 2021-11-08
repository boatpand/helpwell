const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let VictimuserSchema = new Schema(
  {
    Firstname: {type: String},
    Lastname: {type: String},
    Age: {type: Number},
    Gender: {type: String},
    Nationality: {type: String},
    Race:{type:String},
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
    Province:{type:String},
  },
  {
    collection: "Victimuser",
  }
);

module.exports = mongoose.model("Victimuser", VictimuserSchema);