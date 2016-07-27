angular.module('VolunteerHub.event', [])
.controller('EventCtrl', function ($scope, Events,$window, $routeParams, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}
	$scope.userId = window.userId;

	$scope.join = function(){
		Events.joinEvent($scope.userId,$routeParams.id)
	}

	$scope.showEvent = function(){
		Events.getEvent($routeParams.id)
		.then(function(event){
			$scope.event = event;
		})
		.catch(function (error) {
        console.error(error);
      });
	}
	$scope.showEvent();
});