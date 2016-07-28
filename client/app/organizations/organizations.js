angular.module('VolunteerHub.organizations', [])
.controller('organizationsController', function ($scope, Organizations) {

	$scope.data = {};

	$scope.userId = '579912ffbb14051c34ea2d67';

	$scope.initialize = function(){
		Organizations.getAll()
		.then(function(results){
			$scope.data.organizations = results;
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.initialize();

});