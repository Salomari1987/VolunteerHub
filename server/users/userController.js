var sendEmail = require('../emailNotifications.js');
var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findAllusers = Q.nbind(User.find, User);

module.exports = {
	
	signin: function (req, res) {
		var username = req.body.username;
		var password = req.body.password;

		User.findOne({userName: username})
		.exec(function (error, user) {
			if (error) {
				res.status(500).send(error);
			} else if (!user) {
				res.status(500).send(new Error('User does not exist'));
			} else {
				User.comparePassword(password, user.password, res, function(found) {
					if (!found) {
						res.status(500).send('Wrong Password');
					} else {
						var token = jwt.encode(user, 'secret');
						res.setHeader('x-access-token', token);
						res.json({token: token, userId: user._id});
					}
				});
			}
		});
	},

	signup: function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var email = req.body.email;
		var dateOfBirth = req.body.dateOfBirth;
		var gender = req.body.gender;
		var phoneNumber = req.body.phoneNumber;
		var skills = req.body.skills;
		var causes = req.body.causes;
		var picture = req.body.picture;    

		User.findOne({ userName: username })
		.exec(function(err, user) {
			if (!user) {
				var newUser = new User({
					userName: username,
					password: password,
					firstName: firstName,
					lastName: lastName,
					email: email,
					dateOfBirth: dateOfBirth,
					gender: gender,
					phoneNumber: phoneNumber,
					skills: [skills],
					causes: [causes],
					picture: picture
				});
				newUser.save(function(err, newUser) {
					res.send(200, 'done');
				});
			} else {
				console.log('Account already exists');
				res.redirect('/signup');
			}
		});
	},

	checkAuth: function (req, res, next) {
		var token = req.headers['x-access-token'];
		if (!token) {
			next(new Error('No token'));
		} else {
			var user = jwt.decode(token, 'secret');
			findUser({userName: user.userName})
			.then(function (foundUser) {
				if (foundUser) {
					res.send(200);
				} else {
					res.send(401);
				}
			})
			.fail(function (error) {
				next(error);
			});
		}
	},

	getUser: function (req, res, next) {
		User.findOne({userName: req.params.userName}, function (err, user) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(user);
			}
		});
	},

	getAll: function (req, res, next) {
		User.find({}, function(err, users) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(users);
			}
		});
	},

	// a function that allows for the user to edit their basic info
	editUser: function(req, res, next) {
		User.findOne({userName: req.params.userName}, function(err, user) {
			if (err) {
				res.status(500).send(err);
			} else if (!user) {
				res.status(500).send(new Error ('User does not exist'));
			} else {

				user.firstName = req.body.firstName || user.firstName;
				user.lastName = req.body.lastname || user.lastName;
				user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
				user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
				user.skills = req.body.skills || user.skills;
				user.causes = req.body.causes || user.causes;
				user.picture = req.body.picture || user.picture;

				user.save(function(err, savedUser) {
					if (err) {
						res.status(500).send(error);
					} else {
						res.status(201).send(JSON.stringify(savedUser));
					}
				});
			}
		});
	},

	requestNewPass: function(req, res) {
		User.findOne({email: req.params.email}, function (err, user) {
			if (err) {
				res.status(500).send(err);
			} else if (user) {
				var newPass = Math.floor(Math.random() * 100) + 'N' + Math.floor(Math.random() * 100) + 'P' + Math.floor(Math.random() * 100);
				user.password = newPass;
				user.save(function(err, savedUser) {
					if (err) {
						res.status(500).send(error);
					} else {
						var title = savedUser.gender === 'Male' ? 'Mr. ' : 'Mrs. ';
						var emailBody = 'Dear ' + title;
						emailBody += savedUser.lastName + ',\n\nYour Username is: ' + savedUser.userName;
						emailBody += '\nYour New Password is: ' + newPass + '\n\nRegards,\nVolunteerHub Team';   

						// email params
						var mailOptions = {
							to: req.params.email,
							subject: 'New Password',
							text: emailBody
						};
						sendEmail(mailOptions);
						res.status(201).send('Password Sent By Email');
					}
				});
			} else {
				res.status(500).send('No matching email found');
			}
		});
	}   
};
