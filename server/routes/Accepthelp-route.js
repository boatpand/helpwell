let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let AccepthelpSchema = require('../models/Accepthelp');
let AcceptupdateSchema = require('../models/Acceptupdate');

// create Accepthelp
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

// create Acceptupdate
router.route('/accept-update').post((req, res, next) => {
    AcceptupdateSchema.create(req.body, (error,data) => {
        if(error){
            return next(error);
        } else {
            // console.log(error);
            res.json(data);
        }
    })
})

// get AcceptID from RequestID & HelperMobile
router.route("/acceptID/:RequestID/:Mobile").get((req, res, next) => {
    AccepthelpSchema.find(
      { $and: [{ RequestID: req.params.RequestID }, { Helper_Mobile: req.params.Mobile }] },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      }
    );
  });

router.route("/all-accepthelp/success").get((req, res, next) => {
    AccepthelpSchema.find({ Status: "ช่วยเหลือสำเร็จ" }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });

// get help history from user mobile
router.route('/status/:mobile').get((req, res, next) => {
    AccepthelpSchema.find({Helper_Mobile:req.params.mobile}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// update status & Status Text in AccepthelpSchema
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

// get helper name
router.route('/list/:id').get((req, res, next) => {
    AccepthelpSchema.findOne({RequestID:req.params.id}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})
module.exports = router; 