var Opportunity=require('./OpportunityModel.js');
var User=require('../users/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var Opening = require('../openings/OpeningModel.js')
var Organization=require('../organizations/organizationModel.js');

var updateOrganization = Q.nbind(Organization.update, Organization);
var findOpportunity = Q.nbind(Opportunity.findOne, Opportunity);
var createOpportunity = Q.nbind(Opportunity.create, Opportunity);
var findAllOpportunities = Q.nbind(Opportunity.find, Opportunity);

var findOpening = Q.nbind(Opening.findOne, Opening);
var createOpening = Q.nbind(Opening.create, Opening);
var findAllOpenings = Q.nbind(Opening.find, Opening);

module.exports ={

	allOpportunities : function (req,res,next) {
		findAllOpportunities({})
			.then(function (opportunities) {
				res.json(opportunities);
			})
			.fail(function (err) {
				next(err);
			})
	},
	addOpening: function (req, res, next) {
  		var opportunityId = req.params.id.toString();
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
	  		console.log(currOpening)
	  		createOpening(currOpening)
		  	.then(function (newOpening) {
		  		console.log(newOpening)
			    if (newOpening) {
			    	findOpportunity ( { "_id":opportunityId } )
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
  	editOpportunity : function (req,res,next) {
  		var opId = req.params.id;
  		var token = req.headers['x-access-token'];
  		if (!token){
  			next(new Error('No token'))
  		} else {
  			findOpportunity({_id:opId})
  			.then(function (opportunity) {
  				if(!opportunity) {
  					next(new Error('Opportunity does not exist'));
  				} else {
  					opportunity.title = req.body.title || opportunity.title;
  					opportunity.startDate = req.body.startDate || opportunity.startDate;
  					opportunity.endDate = req.body.endDate || opportunity.endDate;
  					opportunity.location = req.body.location || opportunity.location;
  					opportunity.causesArea = req.body.causesArea || opportunity.causesArea;
  					opportunity.description = req.body.description || opportunity.description;
  					opportunity.requiredSkills = req.body.requiredSkills || opportunity.requiredSkills;
  					opportunity.poster = req.body.poster || opportunity.poster;
  					opportunity.save();
  					res.json(opportunity);
  				}
  			})
  		}
  	},
	getCurrOpenings: function (req,res,next) {
		var id = (req.params.id).toString();
		findOpportunity({'_id':id})
		.then(function(opportunity){
			return opportunity.currOpenings
		})
		.then(function(current){
			console.log(current)
			findAllOpenings({'_id': { $in: current}})
	        .then(function(cOpenings){
	          	res.json(cOpenings);
	        })
			.fail(function(err){
				res.send(204);
			})
		})
		.fail(function (err) {
	        next(err);
	 	})
	},
	getClosedOpenings: function (req,res,next) {
		var id = (req.params.id).toString();
		findOpportunity({'_id':id})
		.then(function(opportunity){
			return opportunity.closedOpenings
		})
		.then(function(closed){
			findAllOpenings({'_id': { $in: closed }})
	        .then(function(cOpenings){
	          	 res.json(cOpenings);
	        })
			.fail(function(err){
				res.send(204);
			})
		})
		.fail(function (err) {
	        next(err);
	 	})
	},
  	getOpportunity : function (req,res,next) {
  		var id=(req.params.id).toString();
  		findOpportunity({_id: id}) 
  		.then (function(opportunity) {
		  	res.status(200).send(opportunity);
		})
		.fail(function(error) {
			next(error);
		})
  	},
  	deleteOne : function(req,res, next){
	  	var id=(req.params.id).toString();
	  	var orgId;
	    findOpportunity({ _id : id})
	    .then(function(opportunity){
	    	orgId = opportunity._organizer;
	    	Opening.remove({_id:{$in: opportunity.currOpenings}}, function(err, removed){
	    		if(err){
	    			console.log("Couldn't remove current openings");
	    		} else {
	    			Opening.remove({_id:{$in: opportunity.closedOpenings}}, function(err, removed){
	    				if(err){
			    			console.log("Couldn't remove closed openings");
			    		} else {
			    			opportunity.remove(function(err,table) {
					        if(err){
					          res.status(500).send('Unable to delete organization')
					        } else {
					      		updateOrganization({ _id: orgId }, { $pull: { currentOpportunities: id } })
						    	.fail(function (err) {
						    		updateOrganization({ _id: orgId }, { $pull: { pastOpportunities: id } })
							    	.fail(function (err) {
							    		next(err)
							    	})
					  			})
		          				res.status(201).send('Opportunity Successfully Removed');
				        		}
				      		});
			    		}
	    			})
	    		}
	    	})
	    })
	    .fail(function(err){
			next(error);
	    })
	  },
}