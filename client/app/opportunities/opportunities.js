angular.module('VolunteerHub.opportunities', [])
.controller('OpportunitiesCtrl', function ($scope, Opportunities,$location, Auth) {

	$scope.userId = window.userId;
	
	$scope.data={};
	
	$scope.initialize = function(){
		Opportunities.getAll()
		.then(function(opportunities){
			$scope.data.opportunities = opportunities;
		})
		.catch(function(error){
			console.error(error)
		});
	};

	$scope.initialize();
});