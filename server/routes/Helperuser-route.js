let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

// model
let HelperuserSchema = require('../models/Helperuser')
let HelptypeSchema = require('../models/Helptype')

router.route('/').get((req, res, next) => {
    HelperuserSchema.find(req.body, (error,data) =>{ 
        if (error){
            return next(error);
        } else{
            res.json(data) 
        }
    })
})

// post with hash password
router.route('/register-helper').post(async(req, res, next) => {
    try {
        // Get user input
        const {Firstname,Lastname,Org_Name,isOrg,Mobile,Password,
            Province,House_No,Soi,Road,District,Subdistrict,ZIP_Code,Lat,Lng} =req.body;

        // hash password
        hashPassword = await bcrypt.hash(Password,10)

        // create user in database
        const user = await HelperuserSchema.create({
            Firstname,
            Lastname,
            Org_Name,
            isOrg,
            Mobile,
            Password:hashPassword,

            Province,
            House_No,
            Soi,
            Road,
            District,
            Subdistrict,
            ZIP_Code,

            Lat,
            Lng
        })

        TOKEN_KEY = "qwertyuiop"
        // create token
        const token = jwt.sign(
            {user_id: user._id, Mobile},
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // save user token
        user.token = token;

        // return new user
        res.send({message:"create user success!!"});
        res.status(201).json(user);
    }catch(err){
        console.log(err)
    }
})

// post helptype
router.route('/helptype').post((req, res, next) => {
    HelptypeSchema.create(req.body, (error,data) =>{ 
        if (error){
            return next(error);
        } else{
            console.log(data);
            res.json(data) 
        }
    })
})

// get profile user - general information
router.route('/helper-profile/:mobile').get((req,res,next)=>{
    // console.log(req.params.id)
    HelperuserSchema.findOne({Mobile:req.params.mobile}, (error,data)=>{
        if(error){
            return next(error);
        } else {
            res.json(data)
        }
    })
})

// get profile user - general information
router.route('/helper-helptype/:mobile').get((req,res,next)=>{
    // console.log(req.params.id)
    HelptypeSchema.findOne({Mobile:req.params.mobile}, (error,data)=>{
        if(error){
            return next(error);
        } else {
            res.json(data)
        }
    })
})

// re password
router.route('/update-password').put(async(req, res, next) => {
    try {
        // Get user input
        const {Firstname,Lastname,Org_Name,isOrg,Mobile,Password,
            Province,House_No,Soi,Road,District,Subdistrict,ZIP_Code,Lat,Lng} =req.body;

        // hash password
        hashPassword = await bcrypt.hash(Password,10)

        // create user in database
        const user = await HelperuserSchema.findOneAndUpdate({ Mobile } ,{ 
            Firstname,
            Lastname,
            Org_Name,
            isOrg,
            Mobile,
            Password:hashPassword,

            Province,
            House_No,
            Soi,
            Road,
            District,
            Subdistrict,
            ZIP_Code,

            Lat,
            Lng
        })

        TOKEN_KEY = "qwertyuiop"
        // create token
        const token = jwt.sign(
            {user_id: user._id, Mobile},
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // save user token
        user.token = token;

        // return new user
        res.send({message:"update user success!!"});
        res.status(201).json(user);
    }catch(err){
        console.log(err)
    }
})

// update profile
router.route('/update-profile').put(async(req, res, next) => {
    try {
        // Get user input
        const {Firstname,Lastname,Org_Name,isOrg,Mobile,
            Province,House_No,Soi,Road,District,Subdistrict,ZIP_Code,Lat,Lng} =req.body;

        // create user in database
        const user = await HelperuserSchema.findOneAndUpdate({ Mobile } ,{ 
            Firstname,
            Lastname,
            Org_Name,
            isOrg,

            Province,
            House_No,
            Soi,
            Road,
            District,
            Subdistrict,
            ZIP_Code,

            Lat,
            Lng
        })

        // return new user
        res.send({message:"update user success!!"});
        res.status(201).json(user);
    }catch(err){
        console.log(err)
    }
})

// update helptype
router.route('/update-helptype').put(async(req, res, next) => {
    try {
        // Get user input
        const {Food,Medicine,Bed,Hospital,Home,Other,Mobile} =req.body;

        // create user in database
        const user = await HelptypeSchema.findOneAndUpdate({ Mobile } ,{ 
            Food,
            Medicine,
            Bed,
            Hospital,
            Home,
            Other
        })

        // return new user
        res.send({message:"update user success!!"});
        res.status(201).json(user);
    }catch(err){
        console.log(err)
    }
})

// get all organization
router.route('/all-org').get((req, res, next) => {
    HelperuserSchema.find({isOrg:true}, (error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data)
        }
    })
})

// get helptype of organization
router.route('/helptype-org/:mobile').get((req, res, next) => {
    HelptypeSchema.findOne({Mobile:req.params.mobile}, (error,data) => {
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
    HelptypeSchema.find({Food:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get medicine request
router.route('/medicine-request').get((req, res, next) => {
    HelptypeSchema.find({Medicine:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get hospital request
router.route('/hospital-request').get((req, res, next) => {
    HelptypeSchema.find({Hospital:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get home request
router.route('/home-request').get((req, res, next) => {
    HelptypeSchema.find({Home:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get bed request
router.route('/bed-request').get((req, res, next) => {
    HelptypeSchema.find({Bed:true}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})

// Get other request
router.route('/other-request').get((req, res, next) => {
    HelptypeSchema.find({Other:{$ne:""}}, (error,data) => {
        if(error){return next(error);} else{
            res.json(data)}})})
module.exports = router; 