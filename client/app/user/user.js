angular.module('VolunteerHub.user', [])
.controller('UserCtrl', function ($scope, $window, Users, $routeParams, Auth) {

	$scope.signout = function(){
		Auth.signout();
	}
	$scope.showUser = function (){
		Events.getUser($routeParams.userName)
		.then(function(user){
			$scope.user = user;
		})
		.catch(function (error) {
			console.error(error)
		})
	}
	$scope.showUser();
});