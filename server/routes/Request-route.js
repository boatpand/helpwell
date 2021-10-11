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
    RequestSchema.find(req.body, (error,data) => {
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
    RequestSchema.find({Food:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get medicine request
router.route('/medicine-request').get((req, res, next) => {
    RequestSchema.find({Medicine:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get hospital request
router.route('/hospital-request').get((req, res, next) => {
    RequestSchema.find({Hospital:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get home request
router.route('/home-request').get((req, res, next) => {
    RequestSchema.find({Home:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get bed request
router.route('/bed-request').get((req, res, next) => {
    RequestSchema.find({Bed:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get other request
router.route('/other-request').get((req, res, next) => {
    RequestSchema.find({Other:{$ne:""}}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

//
router.route('/accept-request/:id').get((req,res,next)=>{
    // console.log(req.params.id)
    RequestSchema.findOne({_id:req.params.id}, (error,data)=>{
        if(error){
            return next(error);
        } else {
            res.json(data)
        }
    })
})


module.exports = router; 