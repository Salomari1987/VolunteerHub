var express = require('express');
var mongoose = require('mongoose');

// connect to mongo database named "VolunteerHub"
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/VolunteerHub';
mongoose.connect(mongoURI);
db = mongoose.connection;

db.once('open',function () {
	console.log('mongoDB is open');
});

// start listening to requests on port 8080

var app = express();
// configure our server with all the middleware and routing
var port = process.env.PORT || 8000;
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
// start listening to requests on port 8000


app.listen(port, function () {
  console.log(' app listening on port ' + port);
});

//Kills server connection if it crashes or killed
//this is important so not to keep the 8000 port busy
//If the app crashes
// app.on('uncaughtException', function(){
// 	//Close connection
// 	server.close();
// })
// // On kill
// app.on('SIGTERM', function(){
// 	server.close();
// })
// //On exit
// app.on('exit', function(){
// 	server.close();
// })

// export our app for testing and flexibility, required by index.js
module.exports = app;
