angular.module('VolunteerHub.organizationProfile', [])
.controller('organizationProfileController', function ($scope, $routeParams, Organizations, Auth, Opportunities) {

	$scope.organization = {};

	$scope.userId = window.userId;

	$scope.Auth = Auth.isAuth;

	$scope.initialize = function() {
		Organizations.getOne($routeParams.id)
		.then(function(organization) {
			$scope.organization = organization;
			$scope.organization.contactInfoKeys = Object.keys($scope.organization.contactInfo);
		})
		.catch(function(error) {
			console.log(error);
		});
		Opportunities.getOpportunities($routeParams.id)
		.then(function(opportunites) {
			$scope.organization.opportunites = opportunites;
		})
		.catch(function(error) {
			console.log(error);
		});
	};

	$scope.fetchApplicants = function (opportunityId) {
		Opportunities.getOne(opportunityId)
		.then(function(opportunity) {
			for (var i = 0; i < opportunity.currOpenings; i++) {
				console.log(opportunity.currOpenings[i]);
			}
		})
		.catch(function(err) {
			console.log(err);
		});
	};

	$scope.initialize();
});