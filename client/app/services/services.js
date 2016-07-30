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

  var getAll = function(userName){
    return $http({
      method : 'GET',
      url : '/api/users/'
    })
    .then(function(res){
      return res.data;
    })
  }

  var editUser = function(user, userName){
    return $http({
      method : 'PUT',
      url : '/api/user/'+userName+'/edit',
      data: user
    })
    .then(function(resp){
      return resp;
    })
  }     

  return {
    getUser : getUser,
    getAll : getAll,
    editUser : editUser
  }

})
.factory('Opportunities', function ($http) {
	var getAll = function () {
		return $http({
			method: 'GET',
			url: '/api/opportunities'
		})
		.then(function (res) {
			return res.data;
		});
  }

  var getOpportunities = function(organizationId){
    return $http({
      method: 'GET',
      url: '/api/opportunities/'+organizationId
    })
    .then(function (res) {
      return res.data;
    });
  }

  var createOpportunity = function (newOpportunity) {
        console.log('b')

      return $http({
        method: 'PUT',
        url: '/api/organization/add/'+ newOpportunity['_organizer'],
        data: newOpportunity
      })
      .then(function (resp) {
        return resp;
      });
    }
//need fixing: how to get an event based on their id
  var getOne = function(opportunityId){
    return $http({
      method: 'GET',
      url: '/api/opportunity/'+opportunityId
    })
    .then(function(resp){
      return resp.data;
    });
  }
  var editOpportunity = function(opportunity){
    return $http({
      method: 'PUT',
      url: '/api/opportunity/'+opportunity['_id'],
      data : opportunity
    })
    .then(function (resp){
      return resp;
    });
  };

	return {
    getAll : getAll,
    createOpportunity: createOpportunity,
    getOne: getOne, 
    editOpportunity: editOpportunity,
    getOpportunities: getOpportunities
	};
})
.factory('Openings', function($http){
  var getAll = function (){
    return $http({
      method:'GET',
      url: '/api/openings'
    })
    .then(function(resp){
      return resp.data
    })
  }
  var editOpening = function(opening){
    return $http({
      method: 'PUT',
      url: '/api/openings/'+opening['_id'],
      data : opening
    })
    .then(function (resp){
      return resp;
    });
  };
  var createOpening = function (newOpening) {
    return $http({
      method: 'PUT',
      url: '/api/opportunity/addOpening/'+ newOpening['_opportunity'],
      data: newOpening
    })
    .then(function (resp) {
      return resp;
    });
  }
  return {
    getAll:getAll,
    editOpening: editOpening,
    createOpening: createOpening
  }
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
