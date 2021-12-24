let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db')

// Express Route
// const helpoptionstatusRoute = require('../server/routes/helperoptionstatus-route');
// const helpinneedRoute = require('../server/routes/helpinnneed-route');
const RequestRoute = require('./routes/Request-route');
const DistrictRoute = require('./routes/District-route');
const SubdistrictRoute = require('./routes/Subdistrict-route');
const VictimuserRoute = require('./routes/Victimuser-route');
const CongenitalRoute = require('./routes/Victimuser-route');
const HelperuserRoute = require('./routes/Helperuser-route');
const VerifyRoute = require('./routes/Verify-route');
const AdminRoute = require('./routes/Admin-route');
const AccepthelpRoute = require('./routes/Accepthelp-route');


// Connecting MongoDB Database 
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser: true
}).then(() => {
    console.log('database successfully connected')
},
    error => {
        console.log('Could not connect to database: ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors());
// app.use('/events', helpoptionstatusRoute);
// app.use('/helpinneeds',helpinneedRoute);
app.use('/request', RequestRoute);
app.use('/district', DistrictRoute);
app.use('/subdistrict', SubdistrictRoute);
app.use('/victimuser', VictimuserRoute)
app.use('/victimuser', CongenitalRoute)
app.use('/helperuser', HelperuserRoute)
app.use('/verify', VerifyRoute)
app.use('/admin', AdminRoute)
app.use('/accept', AccepthelpRoute)

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, ()=>{
    console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next)=>{
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})