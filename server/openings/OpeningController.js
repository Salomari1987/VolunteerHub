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

var updateOneOpening = Q.nbind(Opening.findOneAndUpdate, Opening);
var findOpening = Q.nbind(Opening.findOne, Opening);
var createOpening = Q.nbind(Opening.create, Opening);
var findAllOpenings = Q.nbind(Opening.find, Opening);

module.exports = {

	allOpenings : function (req,res,next) {
	findAllOpenings({status:"Active"})
		.then(function (openings) {
			res.json(openings);
		})
		.fail(function (err) {
			next(err);
		})
	},
	
	closeOpening: function (req, res, next) {
  		var openingId = req.params.id.toString();
  		var token = req.headers['x-access-token'];
  		if (!token){
  			next(new Error('No token'))
  		} else {
  			findOpening({_id:openingId})
		  	.then(function (opening) {
			    if (opening) {
			    	var opportunityId = opening._opportunity;
			    	opening.status = "Closed";
			    	opening.save();
			    	updateOpportunity({ _id: opportunityId }, { $pull: { currOpenings: openingId } })
			    	.fail(function (err) {
				    	next(err)
		  			})
		  			updateOneOpportunity({ _id: opportunityId}, { $push: { closedOpenings: openingId } },
      				{ new: true })
      				.then(function(opportunity){
						return opportunity.closedOpenings;
      				})
      				.then(function(closed){
      					findAllOpenings({'_id': { $in: closed}})
				        .then(function(allOpenings){
				          res.json(allOpenings);
				        })
      				})
      				.fail(function(err){
      					next(err);
      				})
			   	}})
		    .fail(function (error) {
		        next(error);
		 	})
		}
	},
	deleteOne : function(req,res, next){
		var id = (req.params.id).toString();
		findOpening({_id:id})
		.then(function(opening){
			var opportunityId = opening._opportunity
			updateOpportunity({ _id: opportunityId }, { $pull: { currOpenings: openingId } })
			.fail(function (err) {
				console.log(err)
		  	})
	    	updateOpportunity({ _id: opportunityId }, { $pull: { closedOpenings: openingId } })
	    	.fail(function (err) {
				console.log(err)
  			})
  			opening.remove(function(err, removed){
  				if(err){
		          res.status(500).send('Unable to delete opening')
		        } else {
		          res.status(201).send('Opening Successfully Removed');
		        }
  			})
		})
	},
	getOpening : function (req,res,next) {
  		var id=(req.params.id).toString();
  		findOpening{_id: id}) 
  		.then (function(opening) {
		  	res.status(200).send(opening);
		})
		.fail(function(error) {
			next(error);
		})
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