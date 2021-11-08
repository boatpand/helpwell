let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');
    
// model
let HelperuserSchema = require('../models/Helperuser')

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
module.exports = router; 