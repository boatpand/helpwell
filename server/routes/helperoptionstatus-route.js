let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// helpoptionstatus model
let helpoptionstatusSchema = require('../models/helpoptionstatus')

// create event
router.route('/create-event').post((req, res, next) => {
    helpoptionstatusSchema.create(req.body, (error,data) => {
        if(error){
            return next(error);
        } else {
            console.log(error);
            res.json(data);
        }
    })
})

// get all event
router.route('/all-event').get((req, res, next) => {
    helpoptionstatusSchema.find(req.body, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

module.exports = router; 