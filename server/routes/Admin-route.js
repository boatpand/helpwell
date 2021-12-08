let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

// model
let AdminSchema = require('../models/Admin')

// sign in
router.route('/login').post(async(req, res, next) => {
    try{
        // Get user input
        const{ Mobile, Password } = req.body;

        // validate if user exist in our victim database
        var user = await AdminSchema.findOne({ Mobile });

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
           res.send({message:"admin",user:user})
           res.status(201).json(user);
           res.json(data);
        } 
        

        res.send({message:"Incorrect Mobile or Password"})

   } catch(err){
       console.log(err);
   }
})

module.exports = router; 