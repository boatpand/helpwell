let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// helpoptionstatus model
let helpoptionstatusSchema = require('../models/helpoptionstatus')

// get all of status:รอความช่วยเหลือ event
router.route('/all-event').get((req, res, next) => {
    helpoptionstatusSchema.find({status:"รอการช่วยเหลือ"}, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

// get all event match filter
router.route('/match-event/:help').get((req, res, next) => {
    helpoptionstatusSchema.find({$and:[{status:"รอการช่วยเหลือ"},{help:{$regex:req.params.help}}]}, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

// Get single event
router.route('/edit-event/:id').get((req, res,next) => {
    helpoptionstatusSchema.findById(req.params.id, (error,data) =>{ 
        if (error){
            return next(error);
        } else{
            res.json(data) 
        }
        // console.log(req.params.id)
    })
})

// put
router.route('/update-event/:id').put((req, res,next) => {
    helpoptionstatusSchema.findByIdAndUpdate(req.params.id, {
        $set:req.body
    }, (error,data) =>{
        if (error){
            return next(error);
        } else{
            res.json(data) 
            console.log('event updated successfully')
        }
    })
})

module.exports = router; 