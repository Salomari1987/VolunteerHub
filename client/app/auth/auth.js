angular.module('VolunteerHub.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  window.userId="";

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
        window.userId = data.userId;
        $window.localStorage.setItem('com.Khitwa', data.token);
        $location.path('/events');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.Khitwa', token);
        $location.path('/events');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
