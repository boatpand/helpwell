const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let helpoptionstatusSchema = new Schema({
    help: {
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    contact: {
        type: String
    },
    status: {
        type:String
    }
}, {
    collection: "helpoptionstatuses"
})

module.exports = mongoose.model('helpoptionstatus',helpoptionstatusSchema)