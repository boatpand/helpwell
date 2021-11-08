let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// model
let DistrictSchema = require('../models/District')

router.route('/:district').get((req, res, next) => {
    DistrictSchema.findOne({District_Name:req.params.district}, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

module.exports = router; 