angular.module('VolunteerHub.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
        window.userId = data.userId;
        $window.localStorage.setItem('com.VolunteerHub', data.token);
        $location.path('/users');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.VolunteerHub', token);
        $location.path('/users');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
