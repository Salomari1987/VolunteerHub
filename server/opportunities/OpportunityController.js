var Opportunity=require('./OpporunityModel.js');
var User=require('../users/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var Opening = require('../openings/openingModel')

var findOpportunity = Q.nbind(Opportunity.findOne, Opportunity);
var createOpportunity = Q.nbind(Opportunity.create, Opportunity);
var findAllOpportunities = Q.nbind(Opportunity.find, Opportunity);

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

	newOpportunity: function (req, res, next) {
	  	var tempOpportunity = {
			title : req.body.title,
			_organizer : req.body._organizer,
			startDate : req.body.startDate,
			endDate : req.body.endDate,
			location : req.body.location,
			// locationId : req.body.locationId,
			type : req.body.type,
			description : req.body.description,
			requiredSkills : req.body.requiredSkills,
			poster : req.body.poster
	  	}
	  	createOpportunity(tempOpportunity)
	  		.then(function (createdOpporunity) {
		        if (createdOpporunity) {
		        	console.log('event created');
		        	console.log(createdOpporunity);
		          res.json(createdOpporunity);
		        }
		      })
		      .fail(function (error) {
		        next(error);
		      });
  	},


  	//Test : Get
  	//http://127.0.0.1:8000/api/event/5790db44f97a940c03550a89

  	getOpportunity : function (req,res,next) {

  		 console.log(req.params.id);
  		 var id=(req.params.id).toString();

  		Opportunity.findOne({_id: id}, function(err, doc) {
  			if(err)
  				res.status(500).send(err);
		  res.status(200).send(doc);
		});
  		
  	},


  	// Test : Post
  	// http://127.0.0.1:8000/api/applyEvent
  	// body :
 	// {
	//   "userId" : "5791c28d6b44ec0c052b6c79",
	//   "eventId" : "5791c53e990f8c9c16839fbd"
	// }



}