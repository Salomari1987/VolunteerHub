angular.module('VolunteerHub.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
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

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (data) {
        window.userId = data.userId
        $window.localStorage.setItem('com.VolunteerHub', data.token);
        $window.localStorage.setItem('userId', data.userId);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
