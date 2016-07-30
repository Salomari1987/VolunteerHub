angular.module('VolunteerHub.openings', [])
.controller('OpeningsCtrl', function ($scope, Openings,$location, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}

	$scope.userId = window.userId;
	$scope.data={};
	Openings.getAll()
	.then(function(openings){
		$scope.data.openings = openings;
	})
	.catch(function(error){
		console.error(error)
	})
});