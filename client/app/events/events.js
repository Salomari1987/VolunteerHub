angular.module('VolunteerHub.events', [])
.controller('EventsCtrl', function ($scope, Events,$location, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}

	$scope.userId = window.userId;
	$scope.data={};
	Events.getEvents()
	.then(function(events){
		$scope.data.events = events;
	})
	.catch(function(error){
		console.error(error)
	})
});