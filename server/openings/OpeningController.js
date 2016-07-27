var Opening=require('./OpeningModel.js');
var User=require('../users/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var Openings = require('../openings/openingsModel')

var findOpening = Q.nbind(Opportunity.findOne, Opening);
var createOpening = Q.nbind(Opening.create, Opening);
var findAllOpening = Q.nbind(Opening.find, Opening);

applyOpportunity :function (req , res , next) {
  		var userId=req.body.userId.toString();
  		var eventId=req.body.eventId;
  		User.update({ _id: userId },{ $pull: { opportunities: opportunityId } },function(err) {if(err) console.log(err)});
  		User.update({ _id: userId },{ $push: { opportunities: opportunityId } }
  			, function (err) {
  				if(err)
  					console.log(err);
  				else
  					console.log('add it');
  			});
  		Opportunity.update({ _id: opportunityId },{ $pull: { users: userId } },function(err) {if(err) console.log(err)});
  		Opportunity.findOneAndUpdate({ _id: opportunityId },{ $push: { users: userId } } , { new : true}
  			, function (err , event) {
  				if(err)
  					console.log(err);
  				else{
  					console.log('add it');
  					res.json(opportunity);
  				}
  			});

}
