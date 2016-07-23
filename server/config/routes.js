//var linksController = require('../users/userController.js');
var userController = require('../users/userController.js');
var eventController = require('../events/eventController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {

  app.post('/api/users/signin', userController.signin);

  app.post('/api/users/signup', userController.signup);
  
  app.get('/api/users/signedin', userController.checkAuth);

  app.get('/api/user/:id',userController.getUser);

  app.get('/api/events',eventController.allEvents);
  
  app.post('/api/createEvent',eventController.newEvent);

  app.get('/api/event/:id',eventController.getEvent);

  app.post('/api/applyEvent',eventController.applyEvent);



  //app.get('/api/users',userController.allUser);

  // app.get('/api/links/', linksController.allLinks);
  // app.post('/api/links/', linksController.newLink);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

