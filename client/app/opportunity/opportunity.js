angular.module('VolunteerHub.opportunity', [])
.controller('OpportunityCtrl', function ($scope, Opportunities ,$window, $routeParams, Auth) {
	$scope.opportunity = {};

	$scope.initialize = function(){
		Opportunities.getOne($routeParams.id)
		.then(function(opportunity){
			$scope.opportunity = opportunity;
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.initialize();
});