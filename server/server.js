var express = require('express');
var mongoose = require('mongoose');
var user=require('./users/userModel.js');
var user=require('./events/eventModel.js');

var app = express();


// connect to mongo database named "VolunteerHub"
mongoose.connect('mongodb://localhost/VolunteerHub');
db=mongoose.connection;
db.once('open',function () {
	console.log('mongoDB is open');
});

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8080
app.listen(8080);
console.log('listen to 8080');

// export our app for testing and flexibility, required by index.js
module.exports = app;
