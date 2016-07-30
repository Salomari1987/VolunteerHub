angular.module('VolunteerHub.users', [])

.controller('usersController', function ($scope,$location, Users) {

	$scope.data = {};

	$scope.initialize = function(){
		Users.getAll()
		.then(function(users){
			$scope.data.users = users;
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.redirect = function(userName){
		$location.path('/user/'+userName)
	}

	$scope.initialize();

});