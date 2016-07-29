angular.module('VolunteerHub.organizationProfile', [])
.controller('organizationProfileController', function ($scope, $routeParams, Organizations, Auth) {

	$scope.organization = {};

	$scope.userId = window.userId;

	$scope.Auth = Auth.isAuth;

	$scope.initialize = function(){
		Organizations.getOne($routeParams.id)
		.then(function(organization){
			$scope.organization = organization;
			$scope.organization.contactInfoKeys = Object.keys($scope.organization.contactInfo);
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.initialize();
});