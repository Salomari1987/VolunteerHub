angular.module('VolunteerHub.opportunityCreateEdit', [])

.controller('opportunityCreateOrEditController', function ($scope, $routeParams, $location, Opportunities) {
	//TODO to send organization name and use a seperate function for create than edit
	$scope.newOpportunity = {};
	$scope.routeParams = $routeParams;
	$scope.changedFlag = false;

	$scope.initialize = function(){
		if($routeParams.oppId){
			Opportunities.getOne($routeParams.oppId)
			.then(function(opportunity){
				console.log(opportunity)
				$scope.newOpportunity = opportunity;
			})
			.catch(function(error){
				console.log(error);
			});
		} else {
			$scope.newOpportunity = {
				poster: 'http://www.f-covers.com/cover/autumn-trees-facebook-cover-timeline-banner-for-fb.jpg',
				causesArea: [],
				skillsRequired: []
			}
		}
	};


	$scope.changeCover = function(){
		var uploadToIMGUR = window.uploadToIMGUR;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', () => {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', ()=>{
				var imgData = reader.result.slice(23);
				// sending the decoded image to IMGUR to get a link for that image
				uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.newOpportunity.poster = result.link;
					$scope.changedFlag = true;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
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
		opportunityId = $routeParams.oppId;
		$scope.newOpportunity._id = opportunityId;
		Opportunities.editOpportunity($scope.newOpportunity)
		.then(function(result){
			$location.path('/opportunities/profile/'+$scope.newOpportunity._id);
		})
		.catch(function(error){
			console.log(error);
		});
	};
	$scope.create = function(){
		var  organizationId = $routeParams.id
		$scope.newOpportunity._organizer = organizationId;
		console.log('a')
		Opportunities.createOpportunity($scope.newOpportunity)
		.then(function(result){
					console.log(result)

			$location.path('/organizations/profile/'+result.data._id);
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.cancel = function(){
		if($routeParams.id){
			$location.path('/opportunities/profile/'+$scope.newOpportunity._id);
		} else {
			$location.path('/opportunities');
		}
	};

	$scope.initialize();
});