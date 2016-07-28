var Opening=require('./OpeningModel.js');
// var User=require('../users/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

var Opportunity=require('../opportunities/OpportunityModel.js');

var findOpportunity = Q.nbind(Opportunity.findOne, Opportunity);
var createOpportunity = Q.nbind(Opportunity.create, Opportunity);
var findAllOpportunities = Q.nbind(Opportunity.find, Opportunity);
var updateOpportunity = Q.nbind(Opportunity.update, Opportunity);
var updateOneOpportunity = Q.nbind(Opportunity.findOneAndUpdate, Opportunity);


var findOpening = Q.nbind(Opportunity.findOne, Opening);
var createOpening = Q.nbind(Opening.create, Opening);
var findAllOpenings = Q.nbind(Opening.find, Opening);

module.exports = {

	allOpenings : function (req,res,next) {
	findAllOpenings({})
		.then(function (openings) {
			res.json(openings);
		})
		.fail(function (err) {
			next(err);
		})
	},
	addOpening: function (req, res, next) {
  		var opportunityId = req.params.id
  		var token = req.headers['x-access-token'];
  		if (!token){
  			next(new Error('No token'))
  		} else {
	  		var currOpening = {
	  			title: req.body.title,
	  			_opportunity: opportunityId,
	  			numberOfVolunteers: req.body.numberOfVolunteers,
	  			location: req.body.location,
	  			description: req.body.description,
	  			skillsRequired: req.body.skillsRequired,
	  			resources: req.body.resources,
	  			status: 'Active'
	  		}
	  		createOpening(currOpening)
		  	.then(function (newOpening) {
			    if (newOpening) {
			    	findOpportunity ( { _id:opportunityId } )
			    	.then(function (opportunity) {
				    	if(!opportunity) {
		  					next(new Error('Opportunity does not exist'));
		  				} else {
		  					opportunity.currOpenings.push(newOpening._id)
		  					opportunity.save();
		  					console.log(opportunity)
		  					return opportunity.currOpenings
		  				}
		  			})
		  			.then(function(openings) {
		  				findAllOpenings({'_id': { $in: openings}})
				        .then(function(allOpenings){
				          res.json(allOpenings);
				        })
		  			})
		  			.fail(function(err){
			        	next(err)
			      	})
			   	}})
		    .fail(function (error) {
		        next(error);
		 	})
		}
	},
	closeOpening: function (req, res, next) {
  		var opportunityId = req.params.id.toString();
  		var openingId = req.body.openingId
  		var token = req.headers['x-access-token'];
  		// if (!token){
  		// 	next(new Error('No token'))
  		// } else {
  			findOpening({_id:openingId})
		  	.then(function (opening) {
			    if (opening) {
			    	opening.status = "Closed";
			    	updateOpportunity({ _id: opportunityId }, { $pull: { currOpenings: openingId } })
			    	.fail(function (err) {
				    	next(err)
		  			})
		  			updateOneOpportunity({ _id: opportunityId}, { $push: { closedOpenings: openingId } },
      				{ new: true })
      				.then(function(opportunity){
      					res.json(opportunity);
      				})
      				.fail(function(err){
      					next(err);
      				})
			   	}})
		    .fail(function (error) {
		        next(error);
		 	})
		// }
	},
applyOpportunity :function (req , res , next) {
  		var userId=req.body.userId.toString();
  		// var eventId=req.body.eventId;



  		// User.update({ _id: userId },{ $pull: { opportunities: opportunityId } },function(err) {if(err) console.log(err)});
  		// User.update({ _id: userId },{ $push: { opportunities: opportunityId } }
  		// 	, function (err) {
  		// 		if(err)
  		// 			console.log(err);
  		// 		else
  		// 			console.log('add it');
  		// 	});
  		// Opportunity.update({ _id: opportunityId },{ $pull: { users: userId } },function(err) {if(err) console.log(err)});
  		// Opportunity.findOneAndUpdate({ _id: opportunityId },{ $push: { users: userId } } , { new : true}
  		// 	, function (err , event) {
  		// 		if(err)
  		// 			console.log(err);
  		// 		else{
  		// 			console.log('add it');
  		// 			res.json(opportunity);
  		// 		}
  		// 	});

	}
}