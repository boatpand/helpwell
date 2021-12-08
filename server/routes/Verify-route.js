let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

TWILIO_ACCOUNT_SID = "AC0168cbb3ba59f12198e49a911663136f"
// always change after push to clound version control
TWILIO_AUTH_TOKEN = "d157983cf942eac906d2784b3a74a93d"
VERIFY_SERVICE_SID= "VA3976cb1c2cd872e91aef627525a14332"
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// router.route('/register-helper').post(async (req, res, next) => {}

router.route('/send').post(async (req, res, next) => {
    console.log(req.body)
    client.verify.services(VERIFY_SERVICE_SID)
    .verifications
    .create({to: req.body.phoneNumber, channel: 'sms'})
    .then(verification => console.log(verification.status))
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });
  res.sendStatus(200);
});


router.route('/otp').post(async (req, res, next) => {
    console.log(req.body)
    const check = await client.verify.services(VERIFY_SERVICE_SID)
    .verificationChecks
    .create({to: req.body.phoneNumber, code: req.body.otp})
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });
  
  res.send({message:"sign up complete"});
  res.status(200).send(check);
});

module.exports = router;