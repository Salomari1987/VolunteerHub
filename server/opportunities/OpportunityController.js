var Opportunity=require('./OpportunityModel.js');
var User=require('../users/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var Opening = require('../openings/OpeningController.js')

var findOpportunity = Q.nbind(Opportunity.findOne, Opportunity);
var createOpportunity = Q.nbind(Opportunity.create, Opportunity);
var findAllOpportunities = Q.nbind(Opportunity.find, Opportunity);

var findOpening = Q.nbind(Opening.findOne, Opening);
var createOpening = Q.nbind(Opening.create, Opening);
var findAllOpening = Q.nbind(Opening.find, Opening);

module.exports ={

	allOpportunities : function (req,res,next) {
		findAllOpportunities({})
			.then(function (opportunities) {
				res.json(opportunities);
			})
			.fail(function (err) {
				//next(err);
			})
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
  					opportunity.type = req.body.type || opportunity.type;
  					opportunity.description = req.body.description || opportunity.description;
  					opportunity.requiredSkills = req.body.requiredSkills || opportunity.requiredSkills;
  					opportunity.poster = req.body.poster || opportunity.poster;
  					opportunity.save();
  					res.json(opportunity);
  				}
  			})
  		}
  	},
  	//TODO remove opportunity
  	//TODO get openings
  	
  	getOpportunity : function (req,res,next) {
  		var id=(req.params.id).toString();
  		findOpportunity({_id: id}) 
  		.then (function(opportunity) {
		  	res.status(200).send(opportunity);
		})
		.fail(function(error) {
			next(error);
		})
  	}
}
	// newOpportunity: function (req, res, next) {
	//   	var tempOpportunity = {
	// 		title : req.body.title,
	// 		_organizer : req.body._organizer,
	// 		startDate : req.body.startDate,
	// 		endDate : req.body.endDate,
	// 		location : req.body.location,
	// 		// locationId : req.body.locationId,
	// 		type : req.body.type,
	// 		description : req.body.description,
 //  			skillsRequired: req.body.skillsRequired,
	// 		poster : req.body.poster
	//   	}
	//   	createOpportunity(tempOpportunity)
	//   		.then(function (createdOpporunity) {
	// 	        if (createdOpporunity) {
	// 	          res.json(createdOpporunity);
	// 	        }
	// 	      })
	// 	      .fail(function (error) {
	// 	        next(error);
	// 	      });
 //  	},