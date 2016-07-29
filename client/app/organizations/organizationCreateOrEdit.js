angular.module('VolunteerHub.organizationCreateEdit', [])

.controller('organizationCreateOrEditController', function ($scope, $routeParams, $location, Organizations) {

	$scope.newOrg = {};

	$scope.changedFlag = false;

	$scope.routeParams = $routeParams;

	$scope.initialize = function(){
		if($routeParams.id){
			Organizations.getOne($routeParams.id)
			.then(function(organization){
				$scope.newOrg = organization;
				$scope.newOrg.contactInfoKeys = Object.keys($scope.newOrg.contactInfo);
			})
			.catch(function(error){
				console.log(error);
			});
		} else {
			$scope.newOrg = {
				picture: 'http://i.imgur.com/FlEXhZo.jpg?1',
				causes_area: [],
				locations: [],
				rate: 0,
				contactInfoKeys: ['Phonenumber','email'],
				contactInfo: {
					Phonenumber: '',
					email: ''
				}
			}
		}
	};


	$scope.changeProfilePic = function(){
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
					$scope.newOrg.picture = result.link;
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
		Organizations.editProfile($scope.newOrg)
		.then(function(result){
			$location.path('/organizations/profile/'+$scope.newOrg._id);
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.create = function(){
		$scope.newOrg.owners = [window.userId];
		Organizations.createOrg($scope.newOrg)
		.then(function(result){
			$location.path('/organizations/profile/'+result.data._id);
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.cancel = function(){
		if($routeParams.id){
			$location.path('/organizations/profile/'+$scope.newOrg._id);
		} else {
			$location.path('/organizations');
		}
	};

	$scope.initialize();
});