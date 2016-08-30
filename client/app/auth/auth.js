angular.module('VolunteerHub.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth, Users) {
	$scope.user = {};

	$scope.msg = '';

	$scope.signin = function () {
		Auth.signin({username: $scope.user.username, password: $scope.user.password})
		.then(function (data) {
			window.userId = data.userId;
			$window.localStorage.setItem('com.VolunteerHub', data.token);
			$window.localStorage.setItem('userId', data.userId);
			$location.path('/');
		})
		.catch(function (error) {
			$scope.SignInMsg = 'Wrong Credentials';
			console.error(error);
		});
		$scope.user.username = '';
		$scope.user.password = '';
	};

	$scope.signup = function () {
		Auth.signup($scope.user)
		.then(function (data) {
			window.userId = data.userId;
			$window.localStorage.setItem('com.VolunteerHub', data.token);
			$window.localStorage.setItem('userId', data.userId);
			$location.path('/');
		})
		.catch(function (error) {
			console.error(error);
		});
	};

	$scope.forgotPass = function() {
		Users.requestPass($scope.user.email)
		.then(function(result) {
			console.log(result);
			if (result.status === 201) {
				$scope.msg = 'Please Check Your Email!';
			} else {
				$scope.msg = 'Wrong Email!';
			}
		})
		.catch(function(error) {
			$scope.msg = 'Wrong Email!';
		});
	};
});
