angular.module('VolunteerHub.userEdit', [])

.controller('userEditController', function ($scope, $routeParams, $location, Users) {

	$scope.user = {};
	$scope.newUser = {};

	$scope.intialize = function() {
		Users.getUser($routeParams.userName)
		.then(function(user) {
			if (!user) {
				$location.path('/404');
			}
			$scope.user = user;
			$scope.newUser = user;
		})
		.catch(function (error) {
			console.error(error);
		});
	};

	$scope.save = function() {
		Users.editUser($scope.newUser, $routeParams.userName)
		.then(function(result) {
			$location.path('/user/' + $routeParams.userName);
		})
		.catch(function(error) {
			console.log(error);
		});
	};

	$scope.intialize();
});