angular.module('VolunteerHub', [
  'VolunteerHub.services',
  'VolunteerHub.opportunityCreateEdit',
  'VolunteerHub.auth',
  'VolunteerHub.opportunity',
  'VolunteerHub.opportunities',
  'VolunteerHub.user',
  'VolunteerHub.users',
  'VolunteerHub.userEdit',
  'VolunteerHub.organizations',
  'VolunteerHub.organizationProfile',
  'VolunteerHub.organizationCreateEdit',
  'VolunteerHub.openings',
  'ngRoute'
  // 'ng',
  // 'ngAria',
  // 'ngAnimate',
  // 'ngMaterial'
])
.controller("HeaderController", function($scope, $location, Auth) {

  $scope.Auth = Auth.isAuth;

  if(Auth.isAuth){
    window.userId = window.localStorage.getItem('userId');
  } else {
    window.userId = null;
  }

  //Sets isActive to true or false for highlighting the buttons in the nav panel
  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
  };
  $scope.logOut = function (){
    Auth.signout();
  }
  $scope.logIn = function (){
    $location.path('/signin');
  }
})
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/users', {
      templateUrl: 'app/user/users.html',
      controller: 'usersController',
    })
    // add routes when needed for pages
    .when('/opportunity/:id', {
      templateUrl: 'app/opportunities/opportunity.html',
      controller: 'OpportunityCtrl',
      authenticate: true
    })
    .when('/opportunities', {
      templateUrl: 'app/opportunities/opportunities.html',
      controller: 'OpportunitiesCtrl',
      // authenticate: true
    })
    .when('/openings', {
      templateUrl: 'app/openings/openings.html',
      controller: 'OpeningsCtrl',
      // authenticate: true
    })
    .when('/createEvent', {
      templateUrl: 'app/createEvent/createEvent.html',
      controller: 'CreateEventCtrl',
      authenticate: true
    })
    .when('/user/:userName', {
      templateUrl: 'app/user/user.html',
      controller: 'UserCtrl',
      authenticate: true
    })
    .when('/user/:userName/edit', {
      templateUrl: 'app/user/userEdit.html',
      controller: 'userEditController',
      authenticate: true
    })
    .when('/organizations', {
      templateUrl: 'app/organizations/organizations.html',
      controller: 'organizationsController',
      // authenticate: true
    })
    .when('/organizations/edit/:id', {
      templateUrl: 'app/organizations/organizationCreateOrEdit.html',
      controller: 'organizationCreateOrEditController',
      authenticate: true
    })
    .when('/organizations/create', {
      templateUrl: 'app/organizations/organizationCreateOrEdit.html',
      controller: 'organizationCreateOrEditController',
      authenticate: true
    })
    .when('/organizations/profile/:id', {
      templateUrl: 'app/organizations/organizationProfile.html',
      controller: 'organizationProfileController',
      authenticate: true
    })
    .when('/opportunities/create/:id', {
      templateUrl: 'app/opportunities/createOpportunity.html',
      controller: 'opportunityCreateOrEditController',
      authenticate: true
    })
    .when('/opportunities/edit/:oppId', {
      templateUrl: 'app/opportunities/createOpportunity.html',
      controller: 'opportunityCreateOrEditController',
      authenticate: true
    })
    .otherwise({ redirectTo: '/organizations' });

    $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      if(next.$$route.controller === 'organizationCreateOrEditController'){
        $location.path('/signin');
      }
    }
  });
});
