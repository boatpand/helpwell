const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let helpinneedSchema = new Schema({
    RequestID: {
        type: mongoose.Types.ObjectId
    },
    food: {
        type: Boolean
    },
    ยา: {
        type: Boolean
    },
    นำส่งโรงพยาบาล: {
        type: Boolean
    },
    นำส่งภูมิลำเนา: {
        type: Boolean
    },
    หาเตียง: {
        type: Boolean
    },
    อื่นๆ:{
        type : String
    },
    หมายเหตุ:{
        type : String
    },
}, {
    collection: "helpinneeds"
})

module.exports = mongoose.model('helpinneed',helpinneedSchema)