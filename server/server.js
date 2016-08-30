var express = require('express');
var mongoose = require('mongoose');

// connect to mongo database named "VolunteerHub"
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/VolunteerHub';
mongoose.connect(mongoURI);
db = mongoose.connection;

db.once('open', function () {
	console.log('mongoDB is open');
});

var app = express();
var port = process.env.PORT || 8000;
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
	next();
});

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(port, function () {
	console.log(' app listening on port ' + port);
});

module.exports = app;
