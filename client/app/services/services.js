angular.module('VolunteerHub.services', [])

.factory('Users', function ($http) {

  var getUser = function(userName){
    return $http({
      method : 'GET',
      url : '/api/user/'+userName
    })
    .then(function(res){
      return res.data;
    })
  }

  var getAll = function(){
    return $http({
      method : 'GET',
      url : '/api/user/'
    })
    .then(function(res){
      return res.data;
    })
  }      

	return {
    getUser : getUser,
    getAll : getAll
	};
})

.factory('Organizations', function($http){

  // a function to add an organization in the database
  var createOrg = function(organization){
    return $http({
      method: 'POST',
      url: '/api/organization',
      data: organization
    })
    .then(function (resp) {
      return resp;
    });
  };

  // a function to get all organizations
  var getAll = function(){
    return $http({
      method: 'GET',
      url: '/api/organization'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // a function to get single organization's info
  var getOne = function(id){
    return $http({
      method: 'GET',
      url: '/api/organization/'+id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // a function to edit the info of an organization
  var editProfile = function(organization){
    return $http({
      method: 'PUT',
      url: '/api/organization/'+organization['_id'],
      data : organization
    })
    .then(function (resp){
      return resp;
    });
  };

  // a function to add an opportunity to an organiztion
  var addOpportunity = function(orgId, opportunityId){
    return $http({
      method: 'PUT',
      url: '/api/organization/add/'+orgId,
      data : {
        opportunityId: opportunityId
      }
    })
    .then(function (resp){
      return resp;
    });
  };

  // a function to close a finished opportunity that belongs to an organiztion
  var closeOpportunity = function(orgId, opportunityId){
    return $http({
      method: 'PUT',
      url: '/api/organization/close/'+orgId,
      data : {
        opportunityId: opportunityId
      }
    })
    .then(function (resp){
      return resp;
    });
  };

  // a function to delete an existing organization
  var deleteOne = function(id){
    return $http({
      method: 'DELETE',
      url: '/api/organization/'+id
    })
    .then(function (resp){
      return resp;
    });
  };

  return {
    createOrg: createOrg,
    getAll: getAll,
    getOne: getOne,
    editProfile: editProfile,
    addOpportunity: addOpportunity,
    closeOpportunity: closeOpportunity,
    deleteOne: deleteOne
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.Khitwa'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.VolunteerHub');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.VolunteerHub');
    $window.localStorage.removeItem('userId');
    window.userId = null;
    $location.path('/');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
