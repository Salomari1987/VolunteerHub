var userController = require('../users/userController.js');
var eventController = require('../events/eventController.js');
var organizationController = require('../organizations/organizationController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {

  app.post('/api/users/signin', userController.signin);

  app.post('/api/users/signup', userController.signup);
  
  app.get('/api/users/signedin', userController.checkAuth);

  app.get('/api/user/:id',userController.getUser);

  app.get('/api/opportunities',eventController.allOpportunities);
  
  app.post('/api/createOpportunity',eventController.newOpportunity);

  app.get('/api/Opportunity/:id',eventController.getOppurtinity);

  app.post('/api/applyOpportunity',eventController.applyOpportunity);


  // Organization Routes
  app.post('/api/organization',organizationController.createOrg);
  app.get('/api/organization',organizationController.getAll);
  app.get('/api/organization/:id',organizationController.getOne);
  app.put('/api/organization/:id',organizationController.editProfile);
  app.put('/api/organization/add/:id',organizationController.addOpportunity);
  app.put('/api/organization/close/:id',organizationController.closeOpportunity);
  app.delete('/api/organization/:id',organizationController.deleteOne);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

