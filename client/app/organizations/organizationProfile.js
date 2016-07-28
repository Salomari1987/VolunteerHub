angular.module('VolunteerHub.organizationProfile', [])
.controller('organizationProfileController', function ($scope, $routeParams, Organizations) {

	$scope.data = {};

	$scope.initialize = function(){
		Organizations.getOne($routeParams.id)
		.then(function(organization){
			$scope.data.organization = organization;
			console.log(organization);
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.initialize();
});