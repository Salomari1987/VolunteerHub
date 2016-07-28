angular.module('VolunteerHub.services', [])

.factory('Events', function ($http) {
	var getEvents = function () {
		return $http({
			method: 'GET',
			url: '/api/events'
		})
		.then(function (res) {
			return res.data;
		});
  }
  var createEvent = function (event) {
      return $http({
        method: 'POST',
        url: '/api/createEvent',
        data: event
      })
    }
//need fixing: how to get an event based on their id
  var getEvent = function(eventId){
    return $http({
      method: 'GET',
      url: '/api/event/'+eventId
    })
    .then(function(resp){
      return resp.data;
    });
  }

  var getUser = function(userID){
    return $http({
      method : 'GET',
      url : '/api/user/'+userID
    })
    .then(function(res){
      return res.data;
    })
  }  

  var joinEvent = function (userID, EventId) {
    return $http({
      method : 'POST',
      url : '/api/applyEvent',
      data : { userId : userID, eventId : EventId }
    })
    .then(function(res){
      return res.data;
    })
  }

	return {
		getEvents: getEvents,
    createEvent: createEvent,
    getEvent: getEvent, 
    getUser : getUser,
    joinEvent : joinEvent
	};
})

.factory('Organizations', function($http){

  // a function to add an organization in the database
  var createOrg = function(organization){
    return $http({
      method: 'POST',
      url: '/api/organization'
    })
    .then(function (resp) {
      return JSON.parse(resp);
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
    return !!$window.localStorage.getItem('com.Khitwa');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.Khitwa');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
