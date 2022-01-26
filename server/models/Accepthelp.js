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

let AccepthelpSchema = new Schema(
  {
    RequestID: {type: String},
    isOrg: {type: Boolean},
    Firstname: {type: String},
    Lastname: {type: String},
    Org_Name: {type: String},
    Helper_Mobile: {type: String},
    Status: {type:String},
    date: {type: Date, default: timeStamp},
  },
  {
    collection: "Accepthelp",
  }
);

module.exports = mongoose.model("Accepthelp", AccepthelpSchema);