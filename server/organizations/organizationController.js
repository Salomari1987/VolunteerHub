var Organization = require('./organizationModel.js');

module.exports = {

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
      if(error){
        res.status(500).send('An error occured');
      }
      res.status(200).send(JSON.stringify(newOrg));
    });
  }  
};
