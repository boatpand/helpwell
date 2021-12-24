let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let AccepthelpSchema = require('../models/Accepthelp')

// create 
router.route('/accept').post((req, res, next) => {
    AccepthelpSchema.create(req.body, (error,data) => {
        if(error){
            return next(error);
        } else {
            // console.log(error);
            res.json(data);
        }
    })
})

// get help history from user mobile
router.route('/status/:mobile').get((req, res, next) => {
    AccepthelpSchema.find({Helper_Mobile:req.params.mobile}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// update status & Status Text
router.route(`/update-status/:RequestID`).put((req,res,next) => {
    AccepthelpSchema.findOneAndUpdate({RequestID:req.params.RequestID},{
        $set: req.body
    }, (error,data) => {
        if(error){
            return next(error);
        }
        else{
            res.json(data)
        }
    })
})
module.exports = router; 