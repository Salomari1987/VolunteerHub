angular.module('VolunteerHub.organizationCreateEdit', [])

.controller('organizationCreateOrEditController', function ($scope, $routeParams, Organizations) {

	$scope.newOrg = {};

	$scope.changedFlag = false;

	$scope.initialize = function(){
		if($routeParams.id){
			Organizations.getOne($routeParams.id)
			.then(function(organization){
				$scope.newOrg = organization;
			})
			.catch(function(error){
				console.log(error);
			});
		} else {
			$scope.newOrg = {
				picture: 'http://i.imgur.com/FlEXhZo.jpg?1'
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
				console.log(imgData);
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

	$scope.initialize();
});