let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

// model
let VictimuserSchema = require('../models/Victimuser')
let CongenitalSchema = require('../models/Congenital')
let HelperSchema = require('../models/Helperuser')

// all mobile
router.route('/').get((req, res, next) => {
    VictimuserSchema.find(req.body, (error,data) =>{ 
        if (error){
            return next(error);
        } else{
            res.json(data) 
        }
    })
})

// post with hash password
router.route('/register-victim').post(async(req, res, next) => {
    try {
        // Get user input
        const {Firstname,Lastname,Age,Gender,Nationality,Race,Mobile,Password,
            Province,House_No,Soi,Road,District,Subdistrict,ZIP_Code,Lat,Lng} =req.body;

        // hash password
        hashPassword = await bcrypt.hash(Password,10)

        // create user in database
        const user = await VictimuserSchema.create({
            Firstname,
            Lastname,
            Age,
            Gender,
            Nationality,
            Race,
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

// post congenital
router.route('/congenital').post((req, res, next) => {
    CongenitalSchema.create(req.body, (error,data) =>{ 
        if (error){
            return next(error);
        } else{
            console.log(data);
            res.json(data) 
        }
    })
})

// sign in
router.route('/login').post(async(req, res, next) => {
    try{
        // Get user input
        const{ Mobile, Password } = req.body;

        // validate if user exist in our victim database
        var user = await VictimuserSchema.findOne({ Mobile });
        if(!user){res.send({message:"No user please sign up"})}
        if(user &&(await bcrypt.compare(Password, user.Password))){
            // Create token
            TOKEN_KEY = "qwertyuiop"
            const token = jwt.sign(
               {user_id: user._id, Mobile},
               TOKEN_KEY,
               {
                   expiresIn: "2h"
               }
           )
           // save user token
           user.token = token;

           // return user
           res.send({message:"victim",user:user})
           res.status(201).json(user);
           res.json(data);
        } else{
            // validate if user exist in our helper database
            var user = await HelperSchema.findOne({ Mobile });
            if(user &&(await bcrypt.compare(Password, user.Password))){
                // Create token
                TOKEN_KEY = "qwertyuiop"
                const token = jwt.sign(
                   {user_id: user._id, Mobile},
                   TOKEN_KEY,
                   {
                       expiresIn: "2h"
                   }
               )
               // save user token
               user.token = token;
    
               // return user
               res.send({message:"helper",user:user})
               res.status(201);
               res.json(data);
            }
        }

        res.send({message:"Incorrect Password"})

   } catch(err){
       console.log(err);
   }
})

module.exports = router; 
