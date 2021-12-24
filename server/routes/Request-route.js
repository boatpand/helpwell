let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// helpoptionstatus model
let RequestSchema = require('../models/Request')


router.route('/insert').post((req, res, next) => {
    RequestSchema.create(req.body, (error,data) => {
        if(error){
            return next(error);
        } else {
            // console.log(error);
            res.json(data);
        }
    })
})

// get all requests
router.route('/all-request').get((req, res, next) => {
    RequestSchema.find({Status:"รอการช่วยเหลือ"}, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

// For Radio box filter
// Get food request
router.route('/food-request').get((req, res, next) => {
    RequestSchema.find({$and: [{Food:true},{Status:"รอการช่วยเหลือ"}]}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get medicine request
router.route('/medicine-request').get((req, res, next) => {
    RequestSchema.find({$and: [{Medicine:true},{Status:"รอการช่วยเหลือ"}]}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get hospital request
router.route('/hospital-request').get((req, res, next) => {
    RequestSchema.find({$and: [{Hospital:true},{Status:"รอการช่วยเหลือ"}]}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get home request
router.route('/home-request').get((req, res, next) => {
    RequestSchema.find({$and: [{Home:true},{Status:"รอการช่วยเหลือ"}]}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get bed request
router.route('/bed-request').get((req, res, next) => {
    RequestSchema.find({$and: [{Bed:true},{Status:"รอการช่วยเหลือ"}]}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get other request
router.route('/other-request').get((req, res, next) => {
    RequestSchema.find({$and: [{Other:{$ne:""}},{Status:"รอการช่วยเหลือ"}]}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// get request detail with request id
router.route(`/request-detail/:id`).get((req, res, next) => {
    RequestSchema.findOne({_id:req.params.id}, (error,data) => {
        if(error){
            return next(error);
        }
        else{
            res.json(data)
        }
    })
})

// update status for accept help from helper
router.route(`/update-help/:RequestID`).put((req,res,next) => {
    RequestSchema.findOneAndUpdate({_id:req.params.RequestID},{
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

// update status & Status Text
router.route(`/update-status/:RequestID`).put((req,res,next) => {
    RequestSchema.findOneAndUpdate({_id:req.params.RequestID},{
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