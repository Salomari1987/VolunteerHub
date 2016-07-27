var userController = require('../users/userController.js');
var organizationController = require('../organizations/organizationController.js');
var opportunityController = require('../opportunities/OpportunityController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {

  app.post('/api/users/signin', userController.signin);

  app.post('/api/users/signup', userController.signup);
  
  app.get('/api/users/signedin', userController.checkAuth);

  app.get('/api/user/:id',userController.getUser);

  app.get('/api/opportunities',opportunityController.allOpportunities);
  
  app.post('/api/createOpportunity',opportunityController.newOpportunity);

  app.get('/api/opportunity/:id',opportunityController.getOpportunity);

  app.put('/api/opportunity/:id',opportunityController.editOpportunity);
  app.put('/api/opportunity/addOpening/:id',opportunityController.addOpening);
  // Organization Routes
  app.post('/api/organization',organizationController.createOrg);
  app.get('/api/organization',organizationController.getAll);
  app.get('/api/organization/:id',organizationController.getOne);
  app.put('/api/organization/:id',organizationController.editProfile);
  app.put('/api/organization/add/:id',organizationController.addOpportunity);
  app.put('/api/organization/close/:id',organizationController.closeOpportunity);
  app.delete('/api/organization/:id',organizationController.deleteOne);

  //app.get('/api/users',userController.allUser);

  // app.get('/api/links/', linksController.allLinks);
  // app.post('/api/links/', linksController.newLink);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

