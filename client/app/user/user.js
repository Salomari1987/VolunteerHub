angular.module('VolunteerHub.user', [])
.controller('UserCtrl', function ($scope, $window, $location, Users, $routeParams, Auth) {

	$scope.signout = function() {
		Auth.signout();
	};

	$scope.showUser = function () {
		Users.getUser($routeParams.userName)
		.then(function(user) {
			if (!user) {
				$location.path('/404');
			}
			$scope.user = user;
		})
		.catch(function (error) {
			console.error(error);
		});
	};

	$scope.edit = function() {
		$location.path('/user/' + $routeParams.userName + '/edit');
	};

	$scope.showUser();
});