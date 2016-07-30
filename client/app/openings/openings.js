angular.module('VolunteerHub.openings', [])
.controller('OpeningsCtrl', function ($scope, Openings,$location, Auth) {

	$scope.userId = window.userId;
	
	$scope.data={};
	
	$scope.intialize = function(){
		Openings.getAll()
		.then(function(openings){
			$scope.data.openings = openings;
		})
		.catch(function(error){
			console.error(error)
		})
	};

	$scope.apply = function(openingId){
		Openings.applyToOpening(openingId)
		.then(function(opening){
			console.log(opening)
		})
	};

	$scope.intialize();
});