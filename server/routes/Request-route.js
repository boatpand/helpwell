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


module.exports = router; 