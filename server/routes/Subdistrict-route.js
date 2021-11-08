let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

//  model
let SubdistrictSchema = require('../models/Subdistrict')

router.route('/:code').get((req, res, next) => {
    SubdistrictSchema.find({Subdistrict_Code:{$regex:req.params.code}}, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

module.exports = router; 