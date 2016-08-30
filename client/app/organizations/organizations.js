angular.module('VolunteerHub.organizations', [])

.controller('organizationsController', function ($scope, Organizations) {

	$scope.data = {};

	$scope.userId = window.userId;

	$scope.initialize = function() {
		Organizations.getAll()
		.then(function(results) {
			$scope.data.organizations = results;
		})
		.catch(function(error) {
			console.log(error);
		});
	};

	$scope.initialize();

});