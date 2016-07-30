angular.module('VolunteerHub.openingCreateEdit', [])

.controller('openingCreateOrEdit', function ($scope, $routeParams, $location, Openings) {
	//TODO to send organization name and use a seperate function for create than edit
	$scope.newOpening = {};
	$scope.routeParams = $routeParams;
	$scope.changedFlag = false;

	$scope.initialize = function(){
		if($routeParams.id){
			Openings.getOne($routeParams.id)
			.then(function(opening){
				$scope.newOpening = opening;
			})
			.catch(function(error){
				console.log(error);
			});
		} else {
			$scope.newOpening = {
				poster: 'http://www.f-covers.com/cover/autumn-trees-facebook-cover-timeline-banner-for-fb.jpg',
				resources: [],
				skillsRequired: []
			}
		}
	};

	$scope.removeItem = function(array, item){
		$scope.changedFlag = true;
		var index = array.indexOf(item);
		array.splice(index,1);
	};

	$scope.addItem = function(array, item){
		$scope.changedFlag = true;
		array.push(item);
		item = '';
	};

	$scope.save = function(){
		openingId = $routeParams.id;
		$scope.newOpening._id = openingId;
		Openings.editOpening($scope.newOpening)
		.then(function(result){
			$location.path('/opportunity/'+$scope.newOpening._opportunity);
		})
		.catch(function(error){
			console.log(error);
		});
	};
	$scope.create = function(){
		var  opportunityId = $routeParams.opId
		$scope.newOpening._opportunity = opportunityId;
		Openings.createOpening($scope.newOpening)
		.then(function(result){
			$location.path('/opportunity/'+$scope.newOpening._opportunity);
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.cancel = function(){
		if($routeParams.id){
			$location.path('/opportunities/profile/'+$scope.newOpening._id);
		} else {
			$location.path('/opportunities');
		}
	};

	$scope.initialize();
});