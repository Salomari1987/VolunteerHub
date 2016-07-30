angular.module('VolunteerHub.opportunities', [])
.controller('OpportunitiesCtrl', function ($scope, Opportunities,$location, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}

	$scope.userId = window.userId;
	$scope.data={};
	Opportunities.getAll()
	.then(function(opportunities){
		$scope.data.opportunities = opportunities;
	})
	.catch(function(error){
		console.error(error)
	})
});