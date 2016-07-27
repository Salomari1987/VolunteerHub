angular.module('VolunteerHub.createEvent', [])
//user can create event
.controller('CreateEventCtrl', function ($scope, $location, Events, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}
	$scope.event={};
	$scope.addEvent = function () {
		Events.createEvent($scope.event)
		.then(function () {
			$location.path('/event');
		})
		.catch(function (error) {
			console.error(error)
		})
	}
});