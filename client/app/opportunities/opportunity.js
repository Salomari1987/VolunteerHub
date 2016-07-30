angular.module('VolunteerHub.opportunity', [])
.controller('OpportunityCtrl', function ($scope, Opportunities , Openings, $window, $routeParams, Auth) {
	$scope.opportunity = {};
	$scope.initialize = function(){
		Opportunities.getOne($routeParams.id)
		.then(function(opportunity){
			$scope.opportunity = opportunity;
			Openings.getOpenings(opportunity._id)
			.then(function(openings){
				$scope.opportunity.openings = openings;
			})
			.catch(function(error){
				console.error(error)
			})
		})
		.catch(function(error){
			console.log(error);
		});

	};
	$scope.apply = function(openingId){
		Openings.applyToOpening(openingId)
		.then(function(opening){
			// $scope.applied=true;
		})
	};

	$scope.initialize();
});