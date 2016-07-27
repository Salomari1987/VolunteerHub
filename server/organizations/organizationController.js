var Organization = require('./organizationModel.js');

module.exports = {

  // a function for creating new organizations
  createOrg : function(req, res) {
    var EIN = req.body.EIN ;
    var name = req.body.name ;
    var causes_area = req.body.causes_area ;
    var locations = req.body.locations ;
    var missionStatement = req.body.missionStatement ;
    var contactInfo = req.body.contactInfo ;
    var rate = req.body.rate ;
    var picture = req.body.picture ;
    var currentOpportunities = req.body.currentOpportunities ;
    var pastOpportunities = req.body.pastOpportunities ;
    var owners = req.body.owners ;

    var newOrg = Organization({
      EIN : EIN ,
      name : name ,
      causes_area : causes_area ,
      locations : locations ,
      missionStatement : missionStatement ,
      contactInfo : contactInfo ,
      rate : rate ,
      picture : picture ,
      currentOpportunities : currentOpportunities ,
      pastOpportunities : pastOpportunities ,
      owners : owners
    });

    newOrg.save(function(error, newOrg){
      if(newOrg){
        res.status(201).send(JSON.stringify(newOrg));
      } else {
        res.status(500).send('An error occured');
      }
    });
  },

  // a function for getting the details of organization by the id of that organization
  getOne : function(req,res){
    Organization.findOne({_id: req.params.id.toString()})
    .exec(function(err, organization){
      if(organization){
        res.status(200).send(JSON.stringify(organization));
      } else{
        res.status(500).send('No such organization exists');
      }
    });
  },

  // a function for getting all the organizations
  getAll : function(req,res){
    Organization.find({})
    .exec(function(error, organizations){
      if(error){
        res.status(500).send(error);
      } else {
        res.status(200).send(JSON.stringify(organizations));
      }
    });
  },

  // a function for editing the profile of the organization
  editProfile : function(req,res){
    Organization.findOne({_id: req.params.id.toString()})
    .exec(function(error, organization){
      if(error){
        res.status(500).send(error);
      } else if(!organization){
        res.status(500).send(new Error ('Organization not added Yet'));
      } else {

        organization.EIN = req.body.EIN || organization.EIN;
        organization.name = req.body.name || organization.name;
        organization.causes_area = req.body.causes_area || organization.causes_area;
        organization.locations = req.body.locations || organization.locations;
        organization.missionStatement = req.body.missionStatement || organization.missionStatement;
        organization.contactInfo = req.body.contactInfo || organization.contactInfo;
        organization.rate = req.body.rate || organization.rate;
        organization.picture = req.body.picture || organization.picture;
        organization.currentOpportunities = req.body.currentOpportunities || organization.currentOpportunities;
        organization.pastOpportunities = req.body.pastOpportunities || organization.pastOpportunities;
        organization.owners = req.body.owners || organization.owners;

        organization.save(function(err, savedOrg){
          if(err){
            res.status(500).send(error);
          } else {
            res.status(201).send('Info Updated!');
          }
        });
      }
    });
  },

  // a function to add an oppotunity to the organization
  addOpportunity : function(req,res){
    Organization.update({ _id: req.params.id.toString() },{ $pull: { currentOpportunities: req.body.eventId } },
      function(err){
        if(err){
          res.status(500).send(err);  
        }
    });
    Organization.update({ _id: req.params.id.toString() },{ $push: { currentOpportunities: req.body.eventId } },
      function (err) {
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(201).send('Updated Successfully');
        }
    });
  },

  // a function for deleting an organization from the database
  deleteOne : function(req,res){
    Organization.findOne({ _id : req.params.id.toString() }, function(err, organization){
      if (err) {
        res.status(500).send(err);
      }
      organization.remove(function(err,table) {
        if(err){
          res.status(500).send('Unable to delete organization')
        } else {
          res.status(201).send('Organization Successfully Removed');
        }
      });
    });
  }
};
