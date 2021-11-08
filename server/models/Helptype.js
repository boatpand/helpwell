const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let HelptypeSchema = new Schema(
  {
    Mobile: {type: String},
    Help: {type: String},
    Food:{type: Boolean},
    Medicine:{type: Boolean},
    Bed:{type: Boolean},
    Hospital:{type: Boolean},
    Home:{type: Boolean},
    Other:{type: String},
  },
  {
    collection: "Helptype",
  }
);

module.exports = mongoose.model("Helptype", HelptypeSchema);